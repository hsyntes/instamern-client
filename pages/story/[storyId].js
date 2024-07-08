import { getStory } from "@/utils/helpers";

const StoryPage = ({ story }) => {
  console.log("story: ", story);
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
