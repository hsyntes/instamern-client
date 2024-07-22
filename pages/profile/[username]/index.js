import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSliceActions } from "@/store/user-slice/current-user-slice";
import { useMutation, useQueryClient } from "react-query";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/modals/Modal";
import Input from "@/components/ui/inputs/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { getUserByUsername, updateProfile } from "@/utils/helpers";
import useInput from "@/hooks/useInput";
import Toast from "@/components/ui/Toast";
import Spinner from "@/components/ui/loadings/Spinner";
import TextArea from "@/components/ui/inputs/TextArea";
import ViewPost from "@/components/ui/modals/ViewPost";

const ProfilePage = ({ user }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const currentUserState = useSelector((state) => state.currentUser);
  const themeState = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const [updateToast, setUpdateToast] = useState(false);
  const [updateToastMessage, setUpdateToastMessage] = useState("");
  const [updateToastVariant, setUpdateToastVariant] = useState("");
  const [inputTheme, setInputTheme] = useState(null);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [viewPostModal, setViewPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleCloseEditProfileModal = () => setEditProfileModal(false);
  const handleOpenEditProfileModal = () => setEditProfileModal(true);

  const handleCloseViewPostModal = () => {
    setViewPostModal(false);
    setSelectedPost(null);
  };

  const handleOpenViewPostModal = (id) => {
    setViewPostModal(true);
    setSelectedPost(id);
  };

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

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: function (data) {
      const { status } = data;

      setUpdateToast(true);
      setUpdateToastMessage(data.message);
      setUpdateToastVariant(status);

      if (status === "success") {
        dispatch(currentUserSliceActions.setCurrentUser(data.data.updatedUser));
        queryClient.refetchQueries({ queryKey: "getCurrentUser" });

        handleCloseEditProfileModal();
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

  console.log("selectedPost", selectedPost);

  if (!user) return <p>User not found.</p>;

  return (
    <>
      <Head>
        <meta name="description" content="User's profile instamern" />
        <meta name="keywords" content="instamern, huseyin ates" />
        <title>
          {user?.user_fullname} (@{user?.user_username}) | Instamern
        </title>
      </Head>
      <section className="py-6 lg:py-0">
        <section className="grid grid-cols-12 lg:flex items-start gap-6 lg:gap-8">
          <section className="col-span-3">
            {user?.user_photo ? (
              <Image
                src={user?.user_photo}
                width={350}
                height={350}
                className="rounded-full w-24 lg:w-28"
                alt="Profile Photo"
                priority
              />
            ) : (
              <Avatar name={user?.user_fullname} size={"3xl"} />
            )}
          </section>
          <section className="col-span-9">
            <section className="flex items-center gap-3 mb-4">
              <section className="cursor-pointer text-sm lg:text-md">
                6 Posts
              </section>
              <section className="cursor-pointer text-sm lg:text-md">
                8 Followers
              </section>
              <section className="cursor-pointer text-sm lg:text-md">
                0 Following
              </section>
            </section>
            <section>
              <section className="flex items-center gap-2 mb-2">
                <h1 className="text-md lg:text-xl">
                  {currentUser?._id === user._id
                    ? currentUser?.user_fullname
                    : user?.user_fullname}
                </h1>
                <p className="text-muted dark:text-muted-dark text-sm lg:text-lg">
                  @
                  {currentUser?._id === user._id
                    ? currentUser?.user_username
                    : user?.user_username}
                </p>
              </section>
              <section className="mb-4">
                <p className="text-sm lg:text-md lg:w-3/4">
                  {currentUser?._id === user._id
                    ? currentUser?.user_bio
                    : user?.user_bio}
                </p>
              </section>
              <section className="hidden lg:block">
                {currentUser?._id === user._id ? (
                  <Button
                    type={"button"}
                    variant={"primary"}
                    className={"py-1.5"}
                    onClick={handleOpenEditProfileModal}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    type={"button"}
                    variant={"primary"}
                    className={"py-1.5"}
                  >
                    Follow
                  </Button>
                )}
              </section>
              <section className="block lg:hidden">
                {currentUser?._id === user._id ? (
                  <Button
                    type={"button"}
                    variant={"primary"}
                    className={"w-full py-2.5"}
                    onClick={() =>
                      router.push(`${currentUser?.user_username}/edit`)
                    }
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    type={"button"}
                    variant={"primary"}
                    className={"w-full py-2.5"}
                  >
                    Follow
                  </Button>
                )}
              </section>
            </section>
          </section>
        </section>
        <hr className="border dark:border-dark my-12" />
        <section className="grid grid-cols-12 gap-4">
          {user &&
            user?.user_posts &&
            user?.user_posts?.length !== 0 &&
            user?.user_posts.map((post) => (
              <section
                className="col-span-4 flex rounded overflow-hidden hover:opacity-90 hover:dark:opacity-75 transition-all cursor-pointer"
                onClick={() => handleOpenViewPostModal(post._id)}
                key={post._id}
              >
                {post?.post_images?.map((post_image) => (
                  <Image
                    src={post_image}
                    className="min-w-full"
                    width={1080}
                    height={1350}
                    key={post_image}
                    alt="User Post Image"
                  />
                ))}
              </section>
            ))}
        </section>
      </section>
      {currentUser && (
        <Modal
          show={editProfileModal}
          handleCloseModal={handleCloseEditProfileModal}
          className={"relative overflow-hidden"}
        >
          {updateProfileMutation.status === "loading" && (
            <section className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-muted dark:bg-muted-dark z-50">
              <Spinner size={"xl"} />
            </section>
          )}
          <form onSubmit={handleSubmit}>
            <Modal.Header handleCloseModal={handleCloseEditProfileModal}>
              <h6 className="font-semibold">Edit Profile</h6>
            </Modal.Header>
            <Modal.Body>
              <section className="flex items-center justify-center mb-8">
                <section className="group relative w-[81px] h-[81px] overflow-hidden">
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
                  <section className="absolute flex items-center justify-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-full opacity-0 group-hover:opacity-50 rounded-full bg-white dark:bg-black transition-all cursor-pointer">
                    <FontAwesomeIcon icon={faCamera} size="lg" />
                  </section>
                </section>
              </section>
              <section>
                <section className="mb-2">
                  <Input
                    type={"text"}
                    name={"fullname"}
                    variant={inputTheme}
                    placeholder={"Fullname"}
                    value={fullname || currentUser?.user_fullname}
                    onChange={handleFullnameOnChange}
                  />
                </section>
                <section className="mb-2">
                  <Input
                    type={"text"}
                    name={"username"}
                    variant={inputTheme}
                    placeholder={"Username"}
                    value={username || currentUser?.user_username}
                    onChange={handleUsernameOnChange}
                  />
                </section>
                <section className="mb-2">
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
              </section>
            </Modal.Body>
            <Modal.Footer className={"justify-end"}>
              <Button
                type={"submit"}
                variant={"primary"}
                disabled={updateProfileMutation.status === "loading"}
              >
                Update
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      )}
      <ViewPost
        show={viewPostModal}
        handleCloseModal={handleCloseViewPostModal}
        postId={selectedPost}
      />
      <Toast
        show={updateToast}
        message={updateToastMessage}
        variant={updateToastVariant}
        setToast={setUpdateToast}
      />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { username } = params;

  const response = await getUserByUsername(username);
  const { user } = response.data;

  return {
    props: {
      user,
    },
  };
}

export default ProfilePage;
