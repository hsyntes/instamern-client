import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { getUserByUsername } from "@/utils/helpers";

const ProfilePage = ({ user }) => {
  const currentUserState = useSelector((state) => state.currentUser);
  const { currentUser } = currentUserState;

  console.log("user: ", user);

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
      <section className="py-8 lg:py-0">
        <section className="flex items-start gap-6 lg:gap-8">
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
          <section>
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
                <h1 className="text-md lg:text-xl">{user?.user_fullname}</h1>
                <p className="text-muted dark:text-muted-dark text-sm lg:text-lg">
                  @{user?.user_username}
                </p>
              </section>
              <section className="mb-4">
                <p className="text-sm lg:text-md lg:w-3/4">{user?.user_bio}</p>
              </section>
              <section>
                {currentUser?._id === user._id ? (
                  <Button
                    type={"button"}
                    variant={"primary"}
                    className={"w-full lg:w-auto py-2 lg:py-1.5"}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    type={"button"}
                    variant={"primary"}
                    className={"w-full lg:w-auto py-2 lg:py-1.5"}
                  >
                    Follow
                  </Button>
                )}
              </section>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { username } = params;

  const response = await getUserByUsername(username);
  const user = response.data.user;

  return {
    props: {
      user,
    },
  };
}

export default ProfilePage;
