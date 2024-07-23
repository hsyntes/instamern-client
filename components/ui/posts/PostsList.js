import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEllipsisV,
  faHeart,
  faPaperPlane,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import Input from "../inputs/Input";
import Spinner from "../loadings/Spinner";
import ViewPost from "../modals/ViewPost";
import useInput from "@/hooks/useInput";
import { createComment, deletePost, getUser } from "@/utils/helpers";
import Dropdown from "../Dropdown";
import ConfirmDialog from "../modals/ConfirmDialog";

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
  const router = useRouter();
  const queryClient = useQueryClient();

  const currentUserState = useSelector((state) => state.currentUser);

  const [postedBy, setPostedBy] = useState(null);
  const [viewPostModal, setViewPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postDropdown, setPostDropdown] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [confirmDialogMessage, setConfirmDialogMessage] = useState("");
  const dropdownRef = useRef();

  const { currentUser } = currentUserState;

  const handlePostDropdown = () => setPostDropdown(!postDropdown);

  function handleCloseViewPostModal() {
    setViewPostModal(false);
    setSelectedPost(null);
  }

  function handleOpenViewPostModal(id) {
    setViewPostModal(true);
    setSelectedPost(id);
  }

  const handleOpenConfirmDialog = () => {
    setConfirmDialog(true);
    setConfirmDialogMessage("Are you sure want to delete this post?");
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialog(false);
    setConfirmDialogMessage("");
  };

  useQuery(["getPostedBy", post.post_postedBy], {
    queryFn: async function () {
      const data = await getUser(post.post_postedBy);

      if (data.status === "success") return data.data.user;
    },
    onSuccess: function (data) {
      setPostedBy(data);
    },
  });

  const deletePostMutation = useMutation({
    mutationKey: "deletePost",
    mutationFn: async function () {
      await deletePost(post?._id);
      queryClient.refetchQueries({ queryKey: "getPosts" });
    },
  });

  const handleDeletePost = () => deletePostMutation.mutate();

  useEffect(
    function () {
      function handleClickOutside(e) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target) &&
          !e.target.classList.contains("dropdown")
        )
          setPostDropdown(false);
      }

      document.addEventListener("click", handleClickOutside, true);

      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    },
    [dropdownRef, setPostDropdown]
  );

  return (
    <>
      <li
        className="lg:w-1/2 xl:w-1/3 select-none"
        style={
          deletePostMutation.status === "loading" ? { opacity: 0.2 } : undefined
        }
      >
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
          {currentUser?.user_username === postedBy?.user_username &&
            deletePostMutation.status !== "loading" && (
              <section className="relative">
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  className="block cursor-pointer p-2"
                  onClick={handlePostDropdown}
                  ref={dropdownRef}
                />
                <Dropdown
                  show={postDropdown}
                  className={
                    "bg-white dark:bg-dark rounded-lg py-4 px-6 right-full"
                  }
                  width={"150px"}
                >
                  <Dropdown.Body>
                    <ul className="dropdown space-y-2">
                      <li className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-all cursor-pointer">
                        <FontAwesomeIcon icon={faPen} />
                        <span>Edit</span>
                      </li>
                      <li
                        className="flex items-center gap-2 text-sm font-semibold text-danger hover:text-danger-darker cursor-pointer"
                        onClick={handleOpenConfirmDialog}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        <span>Delete</span>
                      </li>
                    </ul>
                  </Dropdown.Body>
                </Dropdown>
              </section>
            )}
        </section>
        <section className="mb-6">
          <Image
            src={post.post_images[0]}
            width={1080}
            height={1350}
            className="rounded transition-all  cursor-pointer"
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                deletePostMutation.status !== "loading"
              ) {
                if (window.innerWidth >= 1024)
                  handleOpenViewPostModal(post._id);
                else router.push(`/post/${post?._id}`);
              }
            }}
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
          <p
            className="text-sm text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white font-semibold cursor-pointer transition-all"
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                deletePostMutation.status !== "loading"
              ) {
                if (window.innerWidth >= 1024)
                  handleOpenViewPostModal(post._id);
                else router.push(`/post/${post?._id}`);
              }
            }}
          >
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
      <ConfirmDialog
        show={confirmDialog}
        message={confirmDialogMessage}
        handleCloseConfirmDialog={handleCloseConfirmDialog}
        handleAcceptConfirm={handleDeletePost}
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
