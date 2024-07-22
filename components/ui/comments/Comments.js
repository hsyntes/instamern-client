import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";
import Avatar from "../Avatar";
import { getUser } from "@/utils/helpers";

const CommentItem = ({ comment, commentedById, handleCloseModal }) => {
  const [commentedBy, setCommentedBy] = useState(null);

  useQuery(["getCommentedBy", commentedById], {
    queryFn: async function () {
      const data = await getUser(commentedById);

      if (data.status === "success") return data.data.user;
    },
    onSuccess: function (data) {
      setCommentedBy(data);
    },
    refetchOnWindowFocus: false,
  });

  return (
    commentedBy && (
      <li className="overflow-x-hidden">
        <Link
          href={`/profile/${commentedBy?.user_username}`}
          className="flex items-start gap-2 mb-1"
          onClick={handleCloseModal}
        >
          {commentedBy?.user_photo ? (
            <Image
              src={commentedBy?.user_photo}
              width={350}
              height={350}
              className="w-6 rounded-full"
              alt="User Profile Photo"
            />
          ) : (
            <Avatar name={commentedBy?.user_username} />
          )}
          <h1 className="mb-1">{commentedBy?.user_username}</h1>
        </Link>
        <section className="select-text">
          <p className="text-sm text-justify text-wrap">{comment}</p>
        </section>
      </li>
    )
  );
};

const Comments = ({ comments, handleCloseModal }) => (
  <ul className="space-y-8 lg:space-y-6">
    {comments?.map((comment) => (
      <CommentItem
        comment={comment.comment}
        commentedById={comment.comment_commentedBy}
        handleCloseModal={handleCloseModal}
        key={comment._id}
      />
    ))}
  </ul>
);

export default Comments;
