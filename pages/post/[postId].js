import { getPost } from "@/utils/helpers";

const PostDetailPage = ({ post }) => {
  console.log(post);
};

export async function getServerSideProps({ params }) {
  const { postId } = params;

  const response = await getPost(postId);

  const { post } = response.data;

  return {
    props: {
      post,
    },
  };
}

export default PostDetailPage;
