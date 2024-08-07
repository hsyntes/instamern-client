import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import StoriesLoading from "../loadings/StoriesLoading";
import { getUser } from "@/utils/helpers";

const StoryItem = ({ userId }) => {
  const router = useRouter();
  const themeState = useSelector((state) => state.theme);
  const [loadingTheme, setLoadingTheme] = useState(null);
  const [storiedBy, setStoriedBy] = useState(null);

  const { theme } = themeState;

  const { isLoading: isStoriedByLoading } = useQuery(["getStoriedBy", userId], {
    queryFn: async function () {
      const response = await getUser(userId);
      return response.data.user;
    },
    onSuccess: function (data) {
      setStoriedBy(data);
    },
  });

  useEffect(
    function () {
      setLoadingTheme(theme);
    },
    [theme]
  );

  if (isStoriedByLoading)
    return <StoriesLoading variant={loadingTheme} count={8} />;

  return (
    <li
      className="min-w-14 hover:opacity-90 hover:dark:opacity-75 cursor-pointer transition-all"
      onClick={() => router.push(`/story/${userId}`)}
    >
      {storiedBy?.user_photo ? (
        <div className="bg-gradient-to-br from-primary to-secondary rounded-full p-[3px]">
          <Image
            src={storiedBy?.user_photo}
            width={350}
            height={350}
            className="w-14 rounded-full mx-auto"
            alt="User Profile Photo"
          />
        </div>
      ) : (
        <Avatar
          name={storiedBy?.user_username}
          size={"2xl"}
          className={"border-[3px] border-secondary mx-auto"}
        />
      )}
      <p className="text-sm text-center text-muted dark:text-muted-dark text-nowrap">
        {storiedBy?.user_username}
      </p>
    </li>
  );
};

export default StoryItem;
