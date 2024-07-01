import { useRouter } from "next/router";
import HttpRequest from "@/utils/HttpRequest";

const ProfilePage = ({ user }) => {
  const router = useRouter();

  if (!user) router.push("/");

  return <section className="py-6"></section>;
};

export async function getServerSideProps({ params }) {
  const { username } = params;

  const response = await HttpRequest.get(`users/username/${username}`);

  const { user } = response.data;

  return {
    props: {
      user,
    },
  };
}

export default ProfilePage;
