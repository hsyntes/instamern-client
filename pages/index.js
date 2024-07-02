import Head from "next/head";
import Header from "@/components/ui/Header";

export default function Home() {
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
