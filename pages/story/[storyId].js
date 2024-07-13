import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getStory, getUser } from "@/utils/helpers";

const StoryPage = ({ story }) => {
  const themeState = useSelector((state) => state.theme);

  const [loadingTheme, setLoadingTheme] = useState(null);
  const [storiedBy, setStoriedBy] = useState(null);

  const { theme } = themeState;

  const { isLoading: isStoriedByLoading } = useQuery(
    ["getUserById", story._id],
    {
      queryFn: async function () {
        const response = await getUser(story._id);
        const { data } = response;

        return data.user;
      },
      onSuccess: function (data) {
        setStoriedBy(data);
      },
    }
  );

  useEffect(
    function () {
      setLoadingTheme(theme);
    },
    [theme]
  );

  return (
    <section className="fixed top-0 left-0 flex items-center justify-center">
      <section></section>
      <section></section>
    </section>
  );
};

export async function getServerSideProps({ params }) {
  const { storyId } = params;

  const response = await getStory(storyId);
  const { story } = response.data;

  return {
    props: {
      story,
    },
  };
}

export default StoryPage;
