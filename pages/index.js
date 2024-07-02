import Head from "next/head";
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
      <section className="grid grid-cols-12 gap-2">
        <section className="col-span-9 dark:border-dark"></section>
        <section className="col-span-3 dark:border-dark">
          {randomUsers && <ListUsers users={randomUsers} />}
        </section>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const responseRandomUsers = await getRandomUsers(5);

  const { users } = responseRandomUsers.data;

  return {
    props: {
      randomUsers: users,
    },
  };
}
