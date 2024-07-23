import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  faAngleLeft,
  faAngleRight,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StoriedByLoading from "@/components/ui/loadings/StoriedByLoading";
import { createComment, getPost, getUser } from "@/utils/helpers";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import Comments from "@/components/ui/comments/Comments";
import useInput from "@/hooks/useInput";
import TextArea from "@/components/ui/inputs/TextArea";
import Spinner from "@/components/ui/loadings/Spinner";
import Head from "next/head";

const PostDetailPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const themeState = useSelector((state) => state.theme);

  const [post, setPost] = useState(null);
  const [postedBy, setPostedBy] = useState(null);
  const [loadingTheme, setLoadingTheme] = useState("");
  const [currentPostImage, setCurrentPostImage] = useState(0);
  const [inputTheme, setInputTheme] = useState("");

  const {
    state: { value: comment, isValid: isCommentValid },
    handleOnChange: handleCommentOnChange,
    handleOnClear: handleCommentOnClear,
  } = useInput();

  const { theme } = themeState;
  const { query } = router;

  const { isLoading: isPostLoading } = useQuery(["getPost", query.postId], {
    queryFn: async function () {
      const data = await getPost(query.postId);
      if (data.status === "success") return data.data.post;
    },
    onSuccess: function (data) {
      setPost(data);
    },
    refetchOnWindowFocus: false,
  });

  const { isLoading: isPostedByLoading } = useQuery(
    ["getPostedBy", post?.post_postedBy],
    {
      queryFn: async function () {
        const data = await getUser(post?.post_postedBy);
        if (data.status === "success") return data.data.user;
      },
      enabled: !!post,
      onSuccess: function (data) {
        setPostedBy(data);
      },
      refetchOnWindowFocus: false,
    }
  );

  function handlePreviousPostImage() {
    if (post) {
      if (currentPostImage === 0)
        setCurrentPostImage(post?.post_images.length - 1);
      else setCurrentPostImage(currentPostImage - 1);
    }
  }

  function handleNextPostImage() {
    if (post) {
      if (currentPostImage >= post?.post_images.length - 1)
        setCurrentPostImage(0);
      else setCurrentPostImage(currentPostImage + 1);
    }
  }

  const commentMutation = useMutation({
    mutationFn: isCommentValid && createComment,
    onSuccess: function (data) {
      if (data.status === "success") {
        queryClient.refetchQueries({ queryKey: "getPost" });
        handleCommentOnClear("comment");
      }
    },
  });

  function handleSubmit(e) {
    if (e) e.preventDefault();
    commentMutation.mutate({ postId: post?._id, payload: { comment } });
  }

  function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  useEffect(
    function () {
      setLoadingTheme(theme);
    },
    [theme]
  );

  useEffect(
    function () {
      if (theme === "dark") {
        setInputTheme("black");
        setLoadingTheme(theme);
      }
      if (theme === "light") {
        setInputTheme("white");
        setLoadingTheme(theme);
      }
    },
    [theme]
  );

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Instamern by Huseyin Ates | Hüseyin Ateş"
        />
        <meta name="keywords" content="instamern, huseyin ates, hüseyin ateş" />
        <title>{postedBy?.user_username}'s Post | Instamern</title>
      </Head>
      <section className="sticky top-0 bg-white dark:bg-black py-6 transition-all z-50">
        <h1
          className="text-lg font-semibold flex items-center gap-2"
          onClick={() => router.push("..")}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
          <span>Post</span>
        </h1>
      </section>
      <section>
        {(isPostLoading || isPostedByLoading) && (
          <StoriedByLoading count={1} variant={loadingTheme} />
        )}
        {!(isPostLoading || isPostedByLoading) && (
          <section>
            <section className="relative flex items-center overflow-hidden mb-6">
              {post?.post_images?.map((post_image) => (
                <motion.div
                  animate={{ translateX: `-${currentPostImage * 100}%` }}
                  key={post_image}
                  className="min-w-full"
                >
                  <Image
                    src={post_image}
                    width={1080}
                    height={1350}
                    alt="User Post Image(s)"
                  />
                </motion.div>
              ))}
              {post?.post_images.length > 1 && (
                <>
                  <div
                    className="absolute flex items-center justify-center bg-light dark:bg-black rounded-full cursor-pointer top-1/2 left-4 -translate-y-1/2"
                    style={{ width: "32px", height: "32px" }}
                    onClick={handlePreviousPostImage}
                  >
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      size="lg"
                      className="text-dark dark:text-white"
                    />
                  </div>
                  <div
                    className="absolute flex items-center justify-center bg-light dark:bg-black rounded-full cursor-pointer top-1/2 right-4 -translate-y-1/2"
                    style={{ width: "32px", height: "32px" }}
                    onClick={handleNextPostImage}
                  >
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      size="lg"
                      className="text-dark dark:text-white"
                    />
                  </div>
                </>
              )}
              {post?.post_images.length > 1 && (
                <section className="absolute left-1/2 bottom-4 -translate-x-1/2 flex items-center justify-center gap-3">
                  {post.post_images.map((_, index) => (
                    <div
                      className={`rounded-full ${
                        index === currentPostImage
                          ? "bg-primary"
                          : "bg-muted dark:bg-muted-dark"
                      } p-1`}
                      key={index}
                    />
                  ))}
                </section>
              )}
            </section>
            {postedBy && (
              <section className="mb-8">
                <section className="flex items-start justify-between">
                  <Link
                    href={`/profile/${postedBy?.user_username}`}
                    className="flex items-start gap-3"
                  >
                    {postedBy.user_photo ? (
                      <Image
                        src={postedBy?.user_photo}
                        width={350}
                        height={350}
                        className="rounded-full w-9"
                        alt="User Profile Image"
                      />
                    ) : (
                      <Avatar name={postedBy?.user_username} size={"lg"} />
                    )}
                    <section>
                      <h1 className="mb-1">{postedBy?.user_username}</h1>
                      <p className="text-sm">{post?.post_caption}</p>
                    </section>
                  </Link>
                </section>
              </section>
            )}
            <section className="mb-64">
              <Comments comments={post?.post_comments} />
            </section>
          </section>
        )}
      </section>
      <section className="relative">
        <section className="fixed left-1/2 -translate-x-1/2 bottom-16 w-full px-4 lg:px-6 xl:px-8">
          <form onSubmit={handleSubmit}>
            <TextArea
              inputMode={"text"}
              name={"comment"}
              placeholder={"Comment"}
              value={comment}
              onChange={handleCommentOnChange}
              className={"peer"}
              variant={inputTheme}
              onKeyDown={handleOnKeyDown}
              disabled={commentMutation.status === "loading"}
            />
            {commentMutation.status === "loading" ? (
              <Spinner
                size={"sm"}
                className={
                  "absolute bottom-4 right-6 -translate-y-1/2 -translate-x-1/2"
                }
              />
            ) : (
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="absolute bottom-4 right-6 -translate-y-1/2 -translate-x-1/2 text-dark dark:text-white peer-focus:text-primary hover:text-primary transition-all cursor-pointer"
                onClick={handleSubmit}
              />
            )}
          </form>
        </section>
      </section>
    </>
  );
};

export default PostDetailPage;
