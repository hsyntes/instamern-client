import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getStory, getUser } from "@/utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import StoriedByLoading from "@/components/ui/loadings/StoriedByLoading";
import Avatar from "@/components/ui/Avatar";

const StoryPage = ({ story }) => {
  const router = useRouter();
  const themeState = useSelector((state) => state.theme);

  const [loadingTheme, setLoadingTheme] = useState(null);
  const [storiedBy, setStoriedBy] = useState(null);
  const [currentStory, setCurrentStory] = useState(0);

  const { theme } = themeState;

  function handleNextStory() {
    if (currentStory >= story.story_photos.length - 1) setCurrentStory(0);
    else setCurrentStory(currentStory + 1);
  }

  const { isLoading: isStoriedByLoading } = useQuery(
    ["getUserById", story._id],
    {
      queryFn: async function () {
        const response = await getUser(story._id);
        const { data } = response;

        return data.user;
      },
      onSuccess: function (data) {
        setStoriedBy(data);
      },
    }
  );

  if (typeof window !== "undefined")
    window.addEventListener("keyup", function (e) {
      if (e.key === "Escape") router.push("..");
    });

  useEffect(
    function () {
      setLoadingTheme(theme);
    },
    [theme]
  );

  return (
    <>
      <Head>
        <meta name="description" content="User's stories" />
        <meta name="keywords" content="instamern, huseyin ates" />
        <title>Stories (@{storiedBy?.user_username}) | Instamern</title>
      </Head>
      <section className="w-full h-full hidden lg:flex flex-col items-center justify-center fixed top-0 left-0 select-none">
        <section className="absolute top-12 right-12">
          <FontAwesomeIcon
            icon={faTimes}
            size="xl"
            className="cursor-pointer hover:opacity-50 transition-all"
            onClick={() => router.push("..")}
          />
        </section>
        {(isStoriedByLoading || !storiedBy) && (
          <StoriedByLoading variant={loadingTheme} />
        )}
        {!isStoriedByLoading && storiedBy && (
          <section className="w-1/3 lg:w-1/4 xl:w-1/5">
            <Link
              href={`/profile/${storiedBy.user_username}`}
              className="flex items-center gap-3 mb-4"
            >
              {storiedBy?.user_photo ? (
                <Image
                  src={storiedBy?.user_photo}
                  width={350}
                  height={350}
                  alt="User Profile Photo"
                  className="rounded-full w-8"
                  priority
                />
              ) : (
                <Avatar name={storiedBy?.user_username} size={"lg"} />
              )}
              <p>{storiedBy?.user_username}</p>
            </Link>
            <section
              className="w-full relative overflow-hidden rounded-lg"
              onClick={handleNextStory}
            >
              <section className="flex items-center gap-2 absolute top-0 w-full p-4 z-50">
                {story.story_photos.map((_, index) => (
                  <div
                    className={`w-full ${
                      index === currentStory ? "bg-white" : "bg-muted-dark"
                    } h-0.5`}
                    key={index}
                  />
                ))}
              </section>
              <section className="flex items-center overflow-hidden">
                {story.story_photos.map((story_photo) => (
                  <motion.div
                    animate={{ translateX: `-${currentStory * 100}%` }}
                    className="min-w-full rounded-lg overflow-hidden"
                    key={story_photo}
                  >
                    <Image
                      src={story_photo}
                      width={1080}
                      height={1920}
                      className="w-full rounded-lg"
                      alt="User Story Photo"
                      priority
                    />
                  </motion.div>
                ))}
              </section>
            </section>
          </section>
        )}
      </section>
      <section className="lg:hidden py-6">
        {(isStoriedByLoading || !storiedBy) && (
          <StoriedByLoading variant={loadingTheme} className={"w-full"} />
        )}
        {!isStoriedByLoading && storiedBy && (
          <section>
            <section className="flex items-center justify-between mb-4">
              <Link
                href={`/profile/${storiedBy.user_username}`}
                className="flex items-center gap-3"
              >
                {storiedBy?.user_photo ? (
                  <Image
                    src={storiedBy?.user_photo}
                    width={350}
                    height={350}
                    alt="User Profile Photo"
                    className="rounded-full w-8"
                    priority
                  />
                ) : (
                  <Avatar name={storiedBy?.user_username} size={"lg"} />
                )}
                <p>{storiedBy?.user_username}</p>
              </Link>
              <FontAwesomeIcon
                icon={faTimes}
                size="lg"
                onClick={() => router.push("..")}
              />
            </section>
            <section
              className="flex relative items-center overflow-hidden"
              onClick={handleNextStory}
            >
              <section className="flex items-center gap-2 absolute top-0 w-full p-4 z-50">
                {story.story_photos.map((_, index) => (
                  <div
                    className={`w-full ${
                      index === currentStory ? "bg-white" : "bg-muted-dark"
                    } h-0.5`}
                    key={index}
                  />
                ))}
              </section>
              {story.story_photos.map((story_photo) => (
                <motion.div
                  animate={{ translateX: `-${currentStory * 100}%` }}
                  className="min-w-full rounded-lg overflow-hidden"
                  key={story_photo}
                >
                  <Image
                    src={story_photo}
                    width={1080}
                    height={1920}
                    className="w-full rounded-lg"
                    alt="User Story Photo"
                    priority
                  />
                </motion.div>
              ))}
            </section>
          </section>
        )}
      </section>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const { storyId } = params;

  console.log("storyId: ", storyId);

  const response = await getStory(storyId);
  const { story } = response.data;

  return {
    props: {
      story,
    },
  };
}

export default StoryPage;
