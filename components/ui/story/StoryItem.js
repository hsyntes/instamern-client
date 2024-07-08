import { getUser } from "@/utils/helpers";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";
import ViewStory from "../ViewStory";
import Avatar from "../Avatar";
import Spinner from "../loading/Spinner";

const StoryItem = ({ userId, photos }) => {
  const [storiedBy, setStoriedBy] = useState({});

  const { isLoading: isStoriedByLoading } = useQuery(["getStoriedBy", userId], {
    queryFn: async function () {
      const data = await getUser(userId);

      if (data.status === "success") setStoriedBy(data.data.user);
    },
  });

  if (isStoriedByLoading) return <Spinner />;

  return (
    <>
      {!isStoriedByLoading && storiedBy && (
        <li className="min-w-12 hover:opacity-90 hover:dark:opacity-75 cursor-pointer transition-all">
          {storiedBy?.user_photo ? (
            <Image
              src={storiedBy?.user_photo}
              width={350}
              height={350}
              className="w-14 rounded-full border-4 border-secondary mx-auto"
              alt="User Profile Photo"
            />
          ) : (
            <Avatar name={storiedBy?.user_username} size={"xl"} />
          )}
          <p className="text-sm text-center text-muted dark:text-muted-dark">
            {storiedBy?.user_username}
          </p>
        </li>
      )}
      <ViewStory />
    </>
  );
};

export default StoryItem;
