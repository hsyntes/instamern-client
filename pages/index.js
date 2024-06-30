import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import Head from "next/head";
import { useSelector } from "react-redux";
import Header from "@/components/ui/Header";

export default function Home() {
  const router = useRouter();

  const currentUserState = useSelector((state) => state.currentUser);
  const { currentUser } = currentUserState;

  console.log("currentUser: ", currentUser);

  return (
    <>
      <Head>
        <meta name="description" content="Instamern" />
        <meta name="keywords" content="instamern, huseyin ates" />
        <title>Instamern</title>
      </Head>
      <Header />
    </>
  );
}
