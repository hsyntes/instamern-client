import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Charm_700 } from "@/components/Layout";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FloatingInput from "@/components/ui/form/FloatingInput";
import FormGroup from "@/components/ui/form/FormGroup";
import Spinner from "@/components/ui/loading/Spinner";
import Toast from "@/components/ui/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import useInput from "@/hooks/useInput";
import { checkEmailExists, checkUserExists, signup } from "@/utils/helpers";

const SignupPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const currentUserState = useSelector((state) => state.currentUser);
  const themeState = useSelector((state) => state.theme);

  const [inputTheme, setInputTheme] = useState("");
  const [formStage, setFormStage] = useState(0);
  const [isFormStage_1_Valid, setFormStage_1_Valid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isUserExists, setIsUserExists] = useState(null);
  const [userExistsErrorMessage, setUserExistsErrorMessage] = useState("");
  const [isEmailExists, setIsEmailExists] = useState("");
  const [emailExistsErrorMessage, setEmailExistsErrorMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { theme } = themeState;
  const { currentUser } = currentUserState;

  const {
    state: {
      value: fullname,
      isValid: isFullnameValid,
      isError: isFullnameError,
      errorMessage: fullNameErrorMessage,
    },
    handleOnChange: handleFullnameOnChange,
    handleOnBlur: handleFullnameOnBlur,
  } = useInput();

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
      value: email,
      isValid: isEmailValid,
      isError: isEmailError,
      errorMessage: emailErrorMessage,
    },
    handleOnChange: handleEmailOnChange,
    handleOnBlur: handleEmailOnBlur,
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

  const {
    state: {
      value: passwordConfirm,
      isValid: isPasswordConfirmValid,
      isError: isPasswordConfirmError,
      errorMessage: passwordConfirmErrorMessage,
    },
    handleOnChange: handlePasswordConfirmOnChange,
    handleOnBlur: handlePasswordConfirmOnBlur,
  } = useInput();

  if (typeof window !== "undefined")
    window.addEventListener("keyup", function (e) {
      if (e.key === "Enter" && isFormStage_1_Valid) handleNextFormStage();
    });

  function handleNextFormStage() {
    if (formStage < 1) setFormStage(1);
  }

  function handlePreviousFormStage() {
    if (formStage > 0) setFormStage(0);
  }

  useQuery(["checkUserExits", username], {
    queryFn: async function () {
      if (isUsernameValid) {
        const data = await checkUserExists(username);

        if (data.status === "fail") {
          setIsUserExists(true);
          setUserExistsErrorMessage(data.message);
        }

        if (data.status === "success") {
          setIsUserExists(false);
          setUserExistsErrorMessage("");
        }
      } else {
        setIsUserExists(null);
        setUserExistsErrorMessage("");
      }
    },
    // refetchOnWindowFocus: false,
  });

  useQuery(["checkEmailExists", email], {
    queryFn: async function () {
      if (isEmailValid) {
        const data = await checkEmailExists(email);

        if (data.status === "fail") {
          setIsEmailExists(true);
          setEmailExistsErrorMessage(data.message);
        }

        if (data.status === "success") {
          setIsEmailExists(false);
          setEmailExistsErrorMessage("");
        }
      } else {
        setIsEmailExists(null);
        setEmailExistsErrorMessage("");
      }
    },
  });

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: function (data) {
      if (data.status === "success") {
        queryClient.refetchQueries({ queryKey: "getCurrentUser" });
        router.push("/");
      }

      if (data.status === "fail") {
        setToast(true);
        setToastMessage(data.message);
      }
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    signupMutation.mutate({
      fullname,
      username,
      email,
      password,
      passwordConfirm,
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
        setFormStage_1_Valid(
          isFullnameValid &&
            isUsernameValid &&
            isEmailValid &&
            !isUserExists &&
            !isEmailExists
        );
      }, 350);

      return () => clearTimeout(identifier);
    },
    [
      isFullnameValid,
      isUsernameValid,
      isEmailValid,
      isUserExists,
      isEmailExists,
    ]
  );

  useEffect(
    function () {
      const identifier = setTimeout(function () {
        setIsFormValid(
          isFormStage_1_Valid && isPasswordValid && isPasswordConfirmValid
        );
      }, 350);

      return () => clearTimeout(identifier);
    },
    [isFormStage_1_Valid, isPasswordValid, isPasswordConfirmValid]
  );

  return (
    <>
      <Head>
        <meta name="description" content="Sign up Instamern" />
        <meta name="keywords" content="instamern, huseyin ates" />
        <title>Sign up | Instamern</title>
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
          <Card.Body
            className={"flex items-center overflow-x-hidden w-full my-8"}
          >
            <motion.section
              animate={{ translateX: `-${formStage * 100}%` }}
              className="min-w-full px-1"
            >
              <FormGroup className={"relative mb-3"}>
                <FloatingInput
                  type={"text"}
                  name={"fullname"}
                  placeholder={"Fullname"}
                  variant={inputTheme}
                  value={fullname}
                  onChange={handleFullnameOnChange}
                  onBlur={handleFullnameOnBlur}
                />
                {isFullnameError && (
                  <p className="absolute top-1/2 -translate-y-1/2 text-danger text-xs right-3">
                    {fullNameErrorMessage}
                  </p>
                )}
              </FormGroup>
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
                {isUserExists && (
                  <p className="absolute top-1/2 -translate-y-1/2 text-danger text-xs right-3">
                    {userExistsErrorMessage}
                  </p>
                )}
                {isUserExists === false && isUsernameValid && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-success"
                  />
                )}
              </FormGroup>
              <FormGroup className={"relative mb-4"}>
                <FloatingInput
                  type={"email"}
                  name={"email"}
                  placeholder={"Email Address"}
                  variant={inputTheme}
                  value={email}
                  onChange={handleEmailOnChange}
                  onBlur={handleEmailOnBlur}
                />
                {isEmailError && (
                  <p className="absolute top-1/2 -translate-y-1/2 text-danger text-xs right-3">
                    {emailErrorMessage}
                  </p>
                )}
                {isEmailExists && (
                  <p className="absolute top-1/2 -translate-y-1/2 text-danger text-xs right-3">
                    {emailExistsErrorMessage}
                  </p>
                )}
                {isEmailExists === false && isEmailValid && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-success"
                  />
                )}
              </FormGroup>
              <FormGroup>
                <Button
                  type={"button"}
                  variant={"primary"}
                  className={
                    "flex items-center justify-center gap-2 w-full py-4"
                  }
                  disabled={!isFormStage_1_Valid}
                  onClick={handleNextFormStage}
                >
                  <span>Next</span>
                  <FontAwesomeIcon icon={faAngleRight} />
                </Button>
              </FormGroup>
            </motion.section>
            <motion.section
              animate={{ translateX: `-${formStage * 100}%` }}
              className="min-w-full px-1"
            >
              <FormGroup className={"relative mb-3"}>
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
              <FormGroup className={"relative mb-4"}>
                <FloatingInput
                  type={"password"}
                  name={"password-confirm"}
                  placeholder={"Password Confirm"}
                  variant={inputTheme}
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmOnChange}
                  onBlur={handlePasswordConfirmOnBlur}
                />
                {isPasswordConfirmError && (
                  <p className="absolute top-1/2 -translate-y-1/2 text-danger text-xs right-3">
                    {passwordConfirmErrorMessage}
                  </p>
                )}
              </FormGroup>
              <FormGroup className={"mb-8"}>
                <Button
                  type={"submit"}
                  variant={"primary"}
                  className={
                    "flex items-center justify-center gap-2 w-full py-4"
                  }
                  disabled={!isFormValid || signupMutation.status === "loading"}
                  onClick={handleSubmit}
                >
                  {signupMutation.status === "loading" ? (
                    <Spinner size={"sm"} />
                  ) : (
                    <span>Sign up</span>
                  )}
                </Button>
              </FormGroup>
              <FormGroup>
                <Button
                  type={"button"}
                  variant={"link"}
                  className={
                    "flex items-center justify-center gap-1 mx-auto text-dark dark:text-white"
                  }
                  onClick={handlePreviousFormStage}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                  <span>Back</span>
                </Button>
              </FormGroup>
            </motion.section>
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
                  onClick={() => router.push("/auth/login")}
                >
                  Log in
                </Button>
              </section>
            </section>
          </Card.Footer>
        </Card>
      </form>
      <Toast
        show={toast}
        variant={""}
        setToast={setToast}
        message={toastMessage}
      />
    </>
  );
};

export default SignupPage;
