import { useRouter } from "next/router";
import Link from "next/link";
import Container from "../Container";
import {
  faBell,
  faCirclePlus,
  faHome,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;

  if (pathname.startsWith("/auth")) return;

  return (
    <nav className="block border-dark lg:hidden fixed bottom-0 w-full bg-white dark:bg-black py-3">
      <Container>
        <ul className="flex items-center justify-between">
          <li>
            <Link
              href={"/"}
              className={`text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white ${
                pathname === "/" && "!text-dark dark:!text-white"
              }`}
            >
              <FontAwesomeIcon icon={faHome} size="lg" />
            </Link>
          </li>
          <li>
            <Link
              href={"/search"}
              className={`text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white ${
                pathname === "/search" && "!text-dark dark:!text-white"
              }`}
            >
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </Link>
          </li>
          <li>
            <Link
              href={"/create"}
              className={`text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white ${
                pathname === "/create" && "!text-dark dark:!text-white"
              }`}
            >
              <FontAwesomeIcon icon={faCirclePlus} size="lg" />
            </Link>
          </li>
          <li>
            <Link
              href={"/notifications"}
              className={`text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white ${
                pathname === "/notifications" && "!text-dark dark:!text-white"
              }`}
            >
              <FontAwesomeIcon icon={faBell} size="lg" />
            </Link>
          </li>
          <li>
            <Link
              href={"/profile"}
              className={`text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white ${
                pathname === "/profile" && "!text-dark dark:!text-white"
              }`}
            >
              <FontAwesomeIcon icon={faUser} size="lg" />
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
