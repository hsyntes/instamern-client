import Head from "next/head";
import Image from "next/image";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NotificationsPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="Notifications instamern" />
        <meta name="keywords" content="instamern, huseyin ates" />
        <title>Notifications | Instamern</title>
      </Head>
      <section className="sticky top-0 bg-white dark:bg-black py-6 transition-all">
        <h1 className="text-lg font-semibold flex items-center gap-2">
          <FontAwesomeIcon icon={faBell} />
          <span>Notifications</span>
        </h1>
      </section>
      <section>
        <ul>
          <li className="flex items-start gap-3 bg-light dark:bg-dark rounded-lg p-4">
            <Image
              src={"/logo.svg"}
              width={96}
              height={96}
              className="w-6"
              alt="Logo"
            />
            <section>
              <p className="text-sm">
                Welcome to my application called <strong>Instamern</strong>!
                It's a Full Stack Web Application like Instagram built with
                Next.js & MERN.
              </p>
            </section>
          </li>
        </ul>
      </section>
    </>
  );
};

export default NotificationsPage;
