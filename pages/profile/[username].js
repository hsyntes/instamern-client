import { useRouter } from "next/router";
import { getUserByUsername } from "@/utils/helpers";

const ProfilePage = ({ user }) => {
  const router = useRouter();

  if (!user) router.push("/");

  return <section className="py-6"></section>;
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
