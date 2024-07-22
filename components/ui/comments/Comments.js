import { getUser } from "@/utils/helpers";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";
import Avatar from "../Avatar";
import Link from "next/link";

const CommentItem = ({ comment, commentedById }) => {
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
    <li>
      <Link
        href={`/profile/${commentedBy?.user_username}`}
        className="flex items-start gap-3"
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
        <section>
          <h1 className="mb-1">{commentedBy?.user_username}</h1>
          <p className="text-sm">{comment}</p>
        </section>
      </Link>
    </li>
  );
};

const Comments = ({ comments }) => (
  <ul className="space-y-6">
    {comments?.map((comment) => (
      <CommentItem
        comment={comment.comment}
        commentedById={comment.comment_commentedBy}
        key={comment._id}
      />
    ))}
  </ul>
);

export default Comments;
