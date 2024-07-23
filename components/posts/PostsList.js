import { createComment, getUser } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Avatar from "../ui/Avatar";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEllipsisV,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import useInput from "@/hooks/useInput";
import Input from "../ui/inputs/Input";
import Spinner from "../ui/loadings/Spinner";
import ViewPost from "../ui/modals/ViewPost";

const Comment = ({ postId }) => {
  const queryClient = useQueryClient();

  const themeState = useSelector((state) => state.theme);
  const [inputTheme, setInputTheme] = useState("");

  const {
    state: { value: comment, isValid: isCommentValid },
    handleOnChange: handleCommentOnChange,
    handleOnClear: handleCommentOnClear,
  } = useInput();

  const { theme } = themeState;

  const commentMutation = useMutation({
    mutationFn: isCommentValid && createComment,
    onSuccess: function (data) {
      if (data.status === "success") {
        queryClient.refetchQueries({ queryKey: "getPosts" });
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
      if (theme === "dark") setInputTheme("black");
      if (theme === "light") setInputTheme("white");
    },
    [theme]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type={"text"}
        name={"comment"}
        placeholder={"Comment"}
        value={comment}
        onChange={handleCommentOnChange}
        className={
          "peer border-t-0 border-l-0 border-r-0 rounded-none border-b dark:border-b-dark focus:!border-b-primary !px-0"
        }
        variant={inputTheme}
        onKeyDown={handleOnKeyDown}
        disabled={commentMutation.status === "loading"}
      />
      {commentMutation.status === "loading" ? (
        <Spinner
          size={"sm"}
          className={
            "absolute bottom-3 right-2 -translate-y-1/2 -translate-x-1/2"
          }
        />
      ) : (
        <FontAwesomeIcon
          icon={faPaperPlane}
          size="sm"
          className="absolute top-1/2 right-0 -translate-y-1/2 -translate-x-1/2 text-dark dark:text-white peer-focus:text-primary hover:text-primary transition-all cursor-pointer"
          onClick={handleSubmit}
        />
      )}
    </form>
  );
};

const PostsListItem = ({ post }) => {
  const currentUserState = useSelector((state) => state.currentUser);

  const [postedBy, setPostedBy] = useState(null);
  const [viewPostModal, setViewPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const { currentUser } = currentUserState;

  function handleCloseViewPostModal() {
    setViewPostModal(false);
    setSelectedPost(null);
  }

  function handleOpenViewPostModal(id) {
    setViewPostModal(true);
    setSelectedPost(id);
  }

  useQuery(["getPostedBy", post.post_postedBy], {
    queryFn: async function () {
      const data = await getUser(post.post_postedBy);

      if (data.status === "success") return data.data.user;
    },
    onSuccess: function (data) {
      setPostedBy(data);
    },
  });

  return (
    <>
      <li className="lg:w-1/2 xl:w-1/3">
        <section className="flex items-center justify-between mb-4">
          {postedBy && (
            <Link
              href={`/profile/${postedBy?.user_username}`}
              className="flex items-center gap-3"
            >
              {postedBy?.user_photo ? (
                <Image
                  src={postedBy?.user_photo}
                  width={350}
                  height={350}
                  className="w-9 rounded-full"
                  alt="User Profile Photo"
                />
              ) : (
                <Avatar name={postedBy?.user_username} size={"lg"} />
              )}
              <h1>{postedBy?.user_username}</h1>
            </Link>
          )}
          {currentUser?.user_username === postedBy?.user_username && (
            <FontAwesomeIcon icon={faEllipsisV} className="cursor-pointer" />
          )}
        </section>
        <section className="mb-6">
          <Image
            src={post.post_images[0]}
            width={1080}
            height={1350}
            className="rounded cursor-pointer"
            onClick={() => handleOpenViewPostModal(post?._id)}
            alt="Post Image"
          />
        </section>
        <section className="mb-2">
          <section className="flex items-center gap-4">
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faComment} />
          </section>
        </section>
        <section className="mb-2">
          <p className="text-sm text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white font-semibold cursor-pointer transition-all">
            View all {post.post_comments.length} comments
          </p>
        </section>
        <section className="relative">
          <Comment postId={post?._id} />
        </section>
      </li>
      <ViewPost
        show={viewPostModal}
        handleCloseModal={handleCloseViewPostModal}
        postId={selectedPost}
      />
    </>
  );
};

const PostsList = ({ posts }) => (
  <ul className="space-y-32">
    {posts.map((post) => (
      <PostsListItem post={post} key={post._id} />
    ))}
  </ul>
);

export default PostsList;
