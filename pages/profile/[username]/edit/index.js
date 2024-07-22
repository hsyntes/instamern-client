import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Input from "@/components/ui/inputs/Input";
import { faAngleLeft, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/inputs/TextArea";
import Toast from "@/components/ui/Toast";
import useInput from "@/hooks/useInput";
import { updateProfile } from "@/utils/helpers";
import Spinner from "@/components/ui/loadings/Spinner";
import { currentUserSliceActions } from "@/store/user-slice/current-user-slice";

const EditProfilePage = ({}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const themeState = useSelector((state) => state.theme);
  const currentUserState = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const [updateToast, setUpdateToast] = useState(false);
  const [updateToastMessage, setUpdateToastMessage] = useState("");
  const [updateToastVariant, setUpdateToastVariant] = useState("");
  const [inputTheme, setInputTheme] = useState("");

  const {
    state: { value: fullname, isValid: isFullnameValid },
    handleOnChange: handleFullnameOnChange,
  } = useInput();

  const {
    state: { value: username, isValid: isUsernameValid },
    handleOnChange: handleUsernameOnChange,
  } = useInput();

  const {
    state: { value: bio, isValid: isBioValid },
    handleOnChange: handleBioOnChange,
  } = useInput();

  const { currentUser } = currentUserState;
  const { theme } = themeState;
  const { query } = router;

  const updateProfileMutation = useMutation({
    mutationFn:
      isFullnameValid && isUsernameValid && isBioValid && updateProfile,
    onSuccess: function (data) {
      const { status } = data;

      setUpdateToast(true);
      setUpdateToastMessage(data.message);
      setUpdateToastVariant(status);

      if (status === "success") {
        dispatch(currentUserSliceActions.setCurrentUser(data.data.updatedUser));
        queryClient.refetchQueries({ queryKey: "getCurrentUser" });

        router.push(`/profile/${currentUser?.user_username}`);
      }
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    updateProfileMutation.mutate({
      fullname: fullname || currentUser?.user_fullname,
      username: username || currentUser?.user_username,
      bio: bio || currentUser?.user_bio,
    });
  }

  useEffect(
    function () {
      if (theme === "dark") setInputTheme("black");
      if (theme === "light") setInputTheme("white");
    },
    [theme]
  );

  useEffect(
    function () {
      if (query.username !== currentUser?.user_username) router.push("/");
    },
    [query, currentUser]
  );

  return (
    <>
      <Head>
        <meta name="description" content="User's profile instamern" />
        <meta name="keywords" content="instamern, huseyin ates" />
        <title>Edit {currentUser.user_username}'s Profile | Instamern</title>
      </Head>
      <section
        className="sticky top-0 bg-white dark:bg-black py-6 transition-all"
        onClick={() => router.push(`/profile/${currentUser?.user_username}`)}
      >
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <FontAwesomeIcon icon={faAngleLeft} />
          <span>Edit Profile</span>
        </h1>
      </section>
      {updateProfileMutation.status === "loading" && (
        <section className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-muted dark:bg-muted-dark z-50">
          <Spinner size={"xl"} />
        </section>
      )}
      {currentUser && (
        <section>
          <section className="flex items-center justify-center mb-8">
            <section className="relative w-[81px] h-[81px] overflow-hidden">
              {currentUser?.user_photo ? (
                <Image
                  src={currentUser.user_photo}
                  width={350}
                  height={350}
                  className="rounded-full w-full object-cover"
                  alt="Profile Photo"
                  priority
                />
              ) : (
                <Avatar
                  name={currentUser.user_fullname}
                  size={"3xl"}
                  className={"mx-auto w-full"}
                />
              )}
              <section className="absolute flex items-center justify-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-full opacity-50 rounded-full bg-white dark:bg-black transition-all cursor-pointer">
                <FontAwesomeIcon icon={faCamera} size="lg" />
              </section>
            </section>
          </section>
          <section>
            <form onSubmit={handleSubmit}>
              <section className="mb-3">
                <Input
                  type={"text"}
                  name={"fullname"}
                  variant={inputTheme}
                  placeholder={"Fullname"}
                  value={fullname || currentUser?.user_fullname}
                  onChange={handleFullnameOnChange}
                />
              </section>
              <section className="mb-3">
                <Input
                  type={"text"}
                  name={"username"}
                  variant={inputTheme}
                  placeholder={"Username"}
                  value={username || currentUser?.user_username}
                  onChange={handleUsernameOnChange}
                />
              </section>
              <section className="mb-3">
                <TextArea
                  inputMode={"text"}
                  name={"bio"}
                  placeholder={"Bio"}
                  maxLength={244}
                  value={bio || currentUser?.user_bio}
                  onChange={handleBioOnChange}
                  variant={inputTheme}
                />
              </section>
              <section className="flex items-center">
                <Button
                  type={"submit"}
                  variant={"primary"}
                  className={"w-full py-3"}
                >
                  Save
                </Button>
              </section>
            </form>
          </section>
        </section>
      )}
      <Toast
        show={updateToast}
        message={updateToastMessage}
        variant={updateToastVariant}
        setToast={setUpdateToast}
      />
    </>
  );
};

export default EditProfilePage;
