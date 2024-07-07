import { getUser } from "@/utils/helpers";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";

const StoryItem = ({ userId, photos }) => {
  const [storiedBy, setStoriedBy] = useState({});

  const { isLoading: isStoriedByLoading } = useQuery(["getStoriedBy", userId], {
    queryFn: async function () {
      const data = await getUser(userId);

      if (data.status === "success") setStoriedBy(data.data.user);
    },
  });

  return (
    <ul
      id="stories-slider"
      className="flex items-center gap-4 overflow-x-scroll"
      style={{ scrollbarWidth: "none" }}
    >
      <li className="min-w-12 hover:opacity-90 hover:dark:opacity-75 cursor-pointer transition-all">
        <Image
          src={storiedBy?.user_photo}
          width={350}
          height={350}
          className="w-12 rounded-full border-4 border-secondary mx-auto"
          alt="User Profile Photo"
        />
        <p className="text-sm text-center text-muted dark:text-muted-dark">
          {storiedBy?.user_username}
        </p>
      </li>
    </ul>
  );
};

export default StoryItem;
