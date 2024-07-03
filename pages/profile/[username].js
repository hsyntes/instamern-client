import { useRouter } from "next/router";
import { getUserByUsername } from "@/utils/helpers";
import Image from "next/image";
import Avatar from "@/components/ui/Avatar";
import Head from "next/head";
import Button from "@/components/ui/Button";

const ProfilePage = ({ user }) => {
  const router = useRouter();

  console.log("user: ", user);

  if (!user) router.push("/");

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
        <section className="flex items-start gap-6 lg:gap-12">
          {user?.user_photo ? (
            <Image
              src={user?.user_photo}
              width={350}
              height={350}
              className="rounded-full w-16 lg:w-28"
              alt="Profile Photo"
              priority
            />
          ) : (
            <Avatar name={user?.user_fullname} size={"lg"} />
          )}
          <section>
            <section className="flex items-center gap-3 mb-4">
              <section>6 Posts</section>
              <section>8 Followers</section>
              <section>0 Following</section>
            </section>
            <section>
              <section className="flex items-center gap-3 mb-1">
                <h1 className="text-lg lg:text-xl">{user?.user_fullname}</h1>
                <p className="text-muted dark:text-muted-dark lg:text-lg">
                  @{user?.user_username}
                </p>
              </section>
              <section className="mb-2">
                <p className="lg:w-3/4">{user?.user_bio}</p>
              </section>
              <section>
                <Button
                  type={"button"}
                  variant={"primary"}
                  className={"w-full lg:w-auto py-3 lg:py-1.5"}
                >
                  Edit Profile
                </Button>
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

  const { user } = response.data;

  return {
    props: {
      user,
    },
  };
}

export default ProfilePage;
