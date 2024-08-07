import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "@/components/ui/Header";
import UsersList from "@/components/ui/users/UsersList";
import Stories from "@/components/ui/stories/Stories";
import { getPosts, getRandomUsers, getStories } from "@/utils/helpers";
import { useInfiniteQuery } from "react-query";
import PostsList from "@/components/posts/PostsList";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "@/components/ui/loadings/Spinner";

export default function Home({ stories, randomUsers }) {
  const currentUserState = useSelector((state) => state.currentUser);
  const { currentUser } = currentUserState;

  const [filteredRandomUsers, setFilteredRandomUsers] = useState([]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: "getPosts",
      queryFn: ({ pageParam = 1 }) => getPosts(pageParam),
      getNextPageParam: function ({ data }) {
        const { currentPage, totalPages } = data;
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    });

  const posts = data?.pages?.flatMap((page) => page.data.posts);

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
        <meta
          name="description"
          content="Instamern by Huseyin Ates | Hüseyin Ateş"
        />
        <meta name="keywords" content="instamern, huseyin ates, hüseyin ateş" />
        <title>Instamern</title>
      </Head>
      <Header stories={stories} />
      <section className="lg:hidden mb-12">
        <Stories stories={stories} />
      </section>
      <section className="lg:grid lg:grid-cols-12 gap-2">
        <section className="lg:col-span-9 dark:border-dark mb-48">
          {posts && (
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchNextPage}
              hasMore={hasNextPage}
              style={{ scrollbarWidth: "none" }}
              loader={
                <section className="lg:w-1/2 xl:w-1/3 my-12">
                  <center>
                    <Spinner />
                  </center>
                </section>
              }
            >
              <PostsList posts={posts} />
            </InfiniteScroll>
          )}
        </section>
        <section className="hidden lg:block lg:col-span-3 dark:border-dark">
          <h6 className="mb-4">People you may want to follow</h6>
          {filteredRandomUsers && filteredRandomUsers.length !== 0 && (
            <UsersList users={filteredRandomUsers} />
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
