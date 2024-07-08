import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import StoriesLoading from "../loading/StoriesLoading";
import { getUser } from "@/utils/helpers";

const StoryItem = ({ userId }) => {
  const themeState = useSelector((state) => state.theme);
  const [loadingTheme, setLoadingTheme] = useState("");
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
    return <StoriesLoading variant={loadingTheme} count={10} />;

  return (
    storiedBy &&
    !isStoriedByLoading && (
      <>
        <li className="min-w-14 lg:min-w-14 hover:opacity-90 hover:dark:opacity-75 cursor-pointer transition-all">
          {storiedBy?.user_photo ? (
            <div className="bg-gradient-to-br from-primary to-secondary rounded-full p-[3px]">
              <Image
                src={storiedBy?.user_photo}
                width={350}
                height={350}
                className="w-14 lg:w-14 rounded-full mx-auto"
                alt="User Profile Photo"
              />
            </div>
          ) : (
            <Avatar name={storiedBy?.user_username} size={"xl"} />
          )}
          <p className="text-sm text-center text-muted dark:text-muted-dark">
            {storiedBy?.user_username}
          </p>
        </li>
      </>
    )
  );
};

export default StoryItem;
