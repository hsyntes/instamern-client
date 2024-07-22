import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPaperPlane,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Spinner from "../loadings/Spinner";
import TextArea from "../inputs/TextArea";
import useInput from "@/hooks/useInput";
import Comments from "../comments/Comments";
import ViewPostLoading from "../loadings/ViewPostLoading";
import Avatar from "../Avatar";
import { createComment, getPost, getUser } from "@/utils/helpers";

const ViewPost = ({ show, handleCloseModal, postId }) => {
  const queryClient = useQueryClient();

  const themeState = useSelector((state) => state.theme);

  const [post, setPost] = useState(null);
  const [postedBy, setPostedBy] = useState(null);
  const [currentPostImage, setCurrentPostImage] = useState(0);
  const [loadingTheme, setLoadingTheme] = useState("");
  const [inputTheme, setInputTheme] = useState("");

  const {
    state: { value: comment, isValid: isCommentValid },
    handleOnChange: handleCommentOnChange,
    handleOnClear: handleCommentOnClear,
  } = useInput();

  const { theme } = themeState;

  const { isLoading: isPostLoading } = useQuery(["getPost", postId], {
    queryFn: async function () {
      const data = await getPost(postId);
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
      enabled: !!post && !isPostLoading,
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
    commentMutation.mutate({ postId, payload: { comment } });
  }

  function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  }

  useEffect(
    function () {
      const identifier = setTimeout(function () {
        if (!show) setCurrentPostImage(0);
      }, 100);

      return () => clearTimeout(identifier);
    },
    [show]
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
    <Modal
      show={show}
      handleCloseModal={handleCloseModal}
      className={"flex items-start !w-5/6 h-[90vh] overflow-hidden !p-0"}
    >
      {(isPostLoading || isPostedByLoading) && (
        <ViewPostLoading variant={loadingTheme} />
      )}
      {!(isPostLoading || isPostedByLoading) && postedBy && (
        <>
          <section
            className={
              "w-full h-full relative flex items-center overflow-hidden !p-0 !m-0 border-r dark:border-r-dark bg-light dark:bg-black"
            }
          >
            {post?.post_images.map((post_image, index) => (
              <motion.div
                animate={{ translateX: `-${currentPostImage * 100}%` }}
                className="min-w-full h-full"
                key={index}
              >
                <Image
                  src={post_image}
                  width={1080}
                  height={1350}
                  className="w-full h-full object-contain"
                  alt="User Post Image(s)"
                  priority
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
          <section className={"flex flex-col h-full lg:w-3/4 xl:w-1/2"}>
            <section className="flex items-start justify-between p-4">
              <Link
                href={`/profile/${postedBy?.user_username}`}
                className="flex items-start gap-3"
                onClick={handleCloseModal}
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
              <FontAwesomeIcon
                icon={faTimes}
                size="xl"
                className="text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white hover:scale-105 cursor-pointer transition-all"
                onClick={handleCloseModal}
              />
            </section>
            <section
              className="h-full overflow-y-scroll my-auto p-4"
              style={{ scrollbarWidth: "none" }}
            >
              <Comments
                comments={post?.post_comments}
                handleCloseModal={handleCloseModal}
              />
            </section>
            <section className="relative mt-auto p-4">
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
                      "absolute bottom-10 right-8 -translate-y-1/2 -translate-x-1/2"
                    }
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="absolute bottom-0 right-0 -translate-y-1/2 -translate-x-1/2 px-3 py-4 text-dark dark:text-white peer-focus:text-primary hover:text-primary transition-all cursor-pointer"
                    onClick={handleSubmit}
                  />
                )}
              </form>
            </section>
          </section>
        </>
      )}
    </Modal>
  );
};

export default ViewPost;
