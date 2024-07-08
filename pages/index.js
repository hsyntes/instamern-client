import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "@/components/ui/Header";
import ListUsers from "@/components/ui/users/ListUsers";
import { getRandomUsers, getStories } from "@/utils/helpers";
import Stories from "@/components/ui/story/Stories";

export default function Home({ stories, randomUsers }) {
  const [filteredRandomUsers, setFilteredRandomUsers] = useState([]);

  const currentUserState = useSelector((state) => state.currentUser);
  const { currentUser } = currentUserState;

  useEffect(
    function () {
      if (currentUser)
        setFilteredRandomUsers(
          randomUsers.filter(
            (randomUser) =>
              randomUser.user_username !== currentUser.user_username
          )
        );
      else setFilteredRandomUsers(randomUsers);
    },
    [randomUsers, currentUser]
  );

  return (
    <>
      <Head>
        <meta name="description" content="Instamern" />
        <meta name="keywords" content="instamern, huseyin ates" />
        <title>Instamern</title>
      </Head>
      <Header stories={stories} />
      <section className="lg:hidden">
        <Stories stories={stories} />
      </section>
      <section className="lg:grid lg:grid-cols-12 gap-2">
        <section className="lg:col-span-9 dark:border-dark"></section>
        <section className="hidden lg:block lg:col-span-3 dark:border-dark">
          <h6 className="mb-4">People you may want to follow</h6>
          {filteredRandomUsers && filteredRandomUsers.length !== 0 && (
            <ListUsers users={filteredRandomUsers} />
          )}
        </section>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const responseStories = await getStories();
  const responseRandomUsers = await getRandomUsers(5);

  const { stories } = responseStories.data;
  const { users } = responseRandomUsers.data;

  return {
    props: {
      stories,
      randomUsers: users,
    },
  };
}
