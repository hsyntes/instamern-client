import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Charm_700 } from "@/components/Layout";
import Card from "@/components/ui/Card";
import FormGroup from "@/components/ui/form/FormGroup";
import FloatingInput from "@/components/ui/form/FloatingInput";
import Button from "@/components/ui/Button";
import AlertDialog from "@/components/ui/modal/AlertDialog";
import Spinner from "@/components/ui/loading/Spinner";
import useInput from "@/hooks/useInput";
import HttpRequest from "@/utils/HttpRequest";

const login = async (payload) => await HttpRequest.post("auth/login", payload);

const LoginPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const themeState = useSelector((state) => state.theme);
  const currentUserState = useSelector((state) => state.currentUser);

  const [alertDialog, setAlertDialog] = useState(false);
  const [alertDialogMessage, setAlertDialogMessage] = useState("");
  const [inputTheme, setInputTheme] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const { theme } = themeState;
  const { currentUser } = currentUserState;

  const {
    state: {
      value: username,
      isValid: isUsernameValid,
      isError: isUsernameError,
      errorMessage: usernameErrorMessage,
    },
    handleOnChange: handleUsernameOnChange,
    handleOnBlur: handleUsernameOnBlur,
  } = useInput();

  const {
    state: {
      value: password,
      isValid: isPasswordValid,
      isError: isPasswordError,
      errorMessage: passwordErrorMessage,
    },
    handleOnChange: handlePasswordOnChange,
    handleOnBlur: handlePasswordOnBlur,
  } = useInput();

  const handleAlertDialog = () => setAlertDialog(!alertDialog);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: function (data) {
      console.log("data: ", data);

      if (data.status === "success") {
        queryClient.refetchQueries({ queryKey: "getCurrentUser" });
        router.push("/");
      }

      if (data.status === "fail") {
        handleAlertDialog();
        setAlertDialogMessage(data.message);
      }
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    loginMutation.mutate({
      username,
      password,
    });
  }

  useEffect(
    function () {
      if (currentUser) router.push("/");
    },
    [currentUser]
  );

  useEffect(
    function () {
      if (theme === "dark") setInputTheme("black");
      if (theme === "light") setInputTheme("white");
    },
    [theme]
  );

  useEffect(
    function () {
      const identifier = setTimeout(function () {
        setIsFormValid(isUsernameValid && isPasswordValid);
      }, 350);

      return () => clearTimeout(identifier);
    },
    [isUsernameValid, isPasswordValid]
  );

  return (
    <>
      <Head>
        <meta name="description" content="Sign up Instamern" />
        <meta name="keywords" content="instamern, huseyin ates" />
        <title>Log in | Instamern</title>
      </Head>
      <form
        onSubmit={handleSubmit}
        className="fixed w-screen h-screen left-0 top-0 flex items-center justify-center bg-light dark:bg-black select-none"
      >
        <Card
          className={
            "w-full lg:w-1/3 lg:bg-white lg:dark:bg-dark dark:border-dark lg:rounded lg:border lg:dark:border-dark lg:shadow-sm lg:dark:shadow-2xl py-12 px-8"
          }
        >
          <Card.Header className={"mb-16 lg:mb-8"}>
            <h1
              className={`bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-4xl mx-auto ${Charm_700.className}`}
            >
              <Link href={"/"}>instamern</Link>
            </h1>
          </Card.Header>
          <Card.Body className={"my-8"}>
            <FormGroup className={"relative mb-3"}>
              <FloatingInput
                type={"text"}
                name={"username"}
                placeholder={"Username"}
                variant={inputTheme}
                value={username}
                onChange={handleUsernameOnChange}
                onBlur={handleUsernameOnBlur}
              />
              {isUsernameError && (
                <p className="absolute top-1/2 -translate-y-1/2 text-danger text-xs right-3">
                  {usernameErrorMessage}
                </p>
              )}
            </FormGroup>
            <FormGroup className={"relative mb-4"}>
              <FloatingInput
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                variant={inputTheme}
                value={password}
                onChange={handlePasswordOnChange}
                onBlur={handlePasswordOnBlur}
              />
              {isPasswordError && (
                <p className="absolute top-1/2 -translate-y-1/2 text-danger text-xs right-3">
                  {passwordErrorMessage}
                </p>
              )}
            </FormGroup>
            <FormGroup>
              <Button
                type={"submit"}
                variant={"primary"}
                className={"flex items-center justify-center gap-2 w-full py-4"}
                disabled={!isFormValid || loginMutation.status === "loading"}
                onClick={handleSubmit}
              >
                {loginMutation.status === "loading" ? (
                  <Spinner size={"sm"} />
                ) : (
                  <span>Log in</span>
                )}
              </Button>
            </FormGroup>
          </Card.Body>
          <Card.Footer>
            <section>
              <section className="flex items-center justify-between mb-8">
                <hr className="border dark:border-dark h-0.5 w-1/3" />
                <span className="text-muted dark:text-muted-dark">or</span>
                <hr className="border dark:border-dark h-0.5 w-1/3" />
              </section>
              <section className="flex items-center justify-center">
                <Button
                  type={"button"}
                  variant={"link"}
                  onClick={() => router.push("/auth/signup")}
                >
                  Sign up
                </Button>
              </section>
            </section>
          </Card.Footer>
        </Card>
      </form>
      <AlertDialog
        show={alertDialog}
        handleAlertDialog={handleAlertDialog}
        message={alertDialogMessage}
      />
    </>
  );
};

export default LoginPage;
