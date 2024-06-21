import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faCirclePlus,
  faGear,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <nav className="fixed bottom-0 w-full py-6 lg:col-span-3 lg:flex lg:flex-col lg:h-screen lg:sticky lg:top-0 lg:left-0 px-4">
      <ul className="flex items-center justify-between lg:block lg:border-l-2 lg:mt-auto lg:px-3 gap-3 lg:gap-0">
        <li className="my-8">
          <Link
            href={"/"}
            className={`text-muted ${
              pathname === "/" && "!text-dark dark:!text-white"
            }`}
          >
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Link>
        </li>
        <li className="my-8">
          <Link
            href={"/search"}
            className="text-muted hover:text-dark hover:dark:text-white transition-all"
          >
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </Link>
        </li>
        <li className="my-8">
          <Link
            href={"/create"}
            className="text-muted hover:text-dark hover:dark:text-white transition-all"
          >
            <FontAwesomeIcon icon={faCirclePlus} size="lg" />
          </Link>
        </li>
        <li className="my-8">
          <Link
            href={"/notifications"}
            className="text-muted hover:text-dark hover:dark:text-white transition-all"
          >
            <FontAwesomeIcon icon={faBell} size="lg" />
          </Link>
        </li>
        <li className="my-8">
          <Link
            href={"/profile"}
            className="text-muted hover:text-dark hover:dark:text-white transition-all"
          >
            <FontAwesomeIcon icon={faUser} size="lg" />
          </Link>
        </li>
      </ul>
      <ul className="px-2 py-4 mt-auto hidden lg:block">
        <li className="text-dark dark:text-white">
          <FontAwesomeIcon icon={faGear} size="xl" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
