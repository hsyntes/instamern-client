import Head from "next/head";
import cookie from "cookie";
import Header from "@/components/ui/Header";
import ListUsers from "@/components/ui/users/ListUsers";
import { getRandomUsers } from "@/utils/helpers";

export default function Home({ randomUsers }) {
  return (
    <>
      <Head>
        <meta name="description" content="Instamern" />
        <meta name="keywords" content="instamern, huseyin ates" />
        <title>Instamern</title>
      </Head>
      <Header />
      <section className="lg:grid lg:grid-cols-12 gap-2">
        <section className="lg:col-span-9 dark:border-dark"></section>
        <section className="hidden lg:block lg:col-span-3 dark:border-dark">
          <h6 className="mb-4">People you may want to follow</h6>
          {randomUsers && randomUsers.length !== 0 && (
            <ListUsers users={randomUsers} />
          )}
        </section>
      </section>
    </>
  );
}

export async function getServerSideProps({ req }) {
  let token;

  // Parsing token from server side
  if (req.headers.cookie) {
    token = cookie.parse(req.headers.cookie)["jsonwebtoken"];
  }

  console.log("token: ", token);
  const responseRandomUsers = await getRandomUsers(5, token);

  console.log("responseRandomUsers: ", responseRandomUsers);

  const { users } = responseRandomUsers.data;

  return {
    props: {
      randomUsers: users,
    },
  };
}
