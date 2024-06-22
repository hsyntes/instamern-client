import {
  faGear,
  faHeart,
  faHome,
  faPlusCircle,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Offcanvas from "./Offcanvas";
import Input from "./Input";

const Sidebar = () => {
  const router = useRouter();
  const [searchOffcanvas, setSearchOffcanvas] = useState(false);
  const [notificationsOffcanvas, setNotificationsOffcanvas] = useState(false);

  const handleSearchOffcanvas = () => {
    setSearchOffcanvas(!searchOffcanvas);

    if (notificationsOffcanvas) setNotificationsOffcanvas(false);
  };

  const handleNotificationsOffcanvas = () => {
    setNotificationsOffcanvas(!notificationsOffcanvas);

    if (searchOffcanvas) setSearchOffcanvas(false);
  };

  const { pathname } = router;

  console.log("notificationsOffcanvas: ", notificationsOffcanvas);

  return (
    <aside className="hidden lg:flex lg:col-span-4 xl:col-span-3 h-screen sticky top-0">
      <div className="flex flex-col justify-center items-center bg-white dark:bg-black border-r dark:border-r-dark py-4 px-2 z-50">
        <Link href={"/"} className="mb-auto">
          <Image
            src={"/logo.svg"}
            width={96}
            height={96}
            className="w-7"
            alt="Logo"
            priority
          />
        </Link>
        <nav className="mb-auto">
          <ul className="space-y-6">
            <li
              className={`flex items-center justify-center text-muted dark:text-muted-dark hover:text-dark hover:bg-light hover:dark:bg-dark hover:dark:text-white rounded-full transition-all cursor-pointer p-2 ${
                pathname === "/" && "!text-dark dark:!text-white"
              }`}
            >
              <FontAwesomeIcon icon={faHome} size="lg" />
            </li>
            <li
              className={`flex items-center justify-center text-muted dark:text-muted-dark hover:text-dark hover:bg-light hover:dark:bg-dark hover:dark:text-white rounded-full transition-all cursor-pointer p-2 ${
                searchOffcanvas && "!text-dark dark:!text-white"
              }`}
              onClick={handleSearchOffcanvas}
            >
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </li>
            <li
              className={`flex items-center justify-center text-muted dark:text-muted-dark hover:text-dark hover:bg-light hover:dark:bg-dark hover:dark:text-white rounded-full transition-all cursor-pointer p-2`}
            >
              <FontAwesomeIcon icon={faPlusCircle} size="lg" />
            </li>
            <li
              className={`flex items-center justify-center text-muted dark:text-muted-dark hover:text-dark hover:bg-light hover:dark:bg-dark hover:dark:text-white rounded-full transition-all cursor-pointer p-2 ${
                notificationsOffcanvas && "!text-dark dark:!text-white"
              }`}
              onClick={handleNotificationsOffcanvas}
            >
              <FontAwesomeIcon icon={faHeart} size="lg" />
            </li>
            <li
              className={`flex items-center justify-center text-muted dark:text-muted-dark hover:text-dark hover:bg-light hover:dark:bg-dark hover:dark:text-white rounded-full transition-all cursor-pointer p-2`}
            >
              <FontAwesomeIcon icon={faUser} size="lg" />
            </li>
          </ul>
        </nav>
        <ul>
          <li className="flex items-center justify-center text-dark dark:text-white hover:bg-light hover:dark:bg-dark rounded-full transition-all cursor-pointer p-2">
            <FontAwesomeIcon icon={faGear} size="lg" />
          </li>
        </ul>
      </div>
      <section className="w-full">
        <Offcanvas show={searchOffcanvas}>
          <Offcanvas.Header handleOffcanvas={handleSearchOffcanvas}>
            <h1 className="text-lg font-semibold mb-2">Search</h1>
            <Input
              type={"text"}
              name={"search"}
              variant={"black"}
              placeholder={"Search"}
            />
          </Offcanvas.Header>
          <Offcanvas.Body></Offcanvas.Body>
          <Offcanvas.Footer />
        </Offcanvas>
        <Offcanvas show={notificationsOffcanvas}>
          <Offcanvas.Header handleOffcanvas={handleNotificationsOffcanvas}>
            <h1 className="text-lg font-semibold mb-2">Notifications</h1>
          </Offcanvas.Header>
        </Offcanvas>
      </section>
    </aside>
  );
};

export default Sidebar;
