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
    <nav className="block border-dark lg:hidden fixed bottom-0 w-full bg-white dark:bg-dark py-3">
      <Container>
        <ul className="flex items-center justify-between">
          <li>
            <Link
              href={"/"}
              className={`text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white text-lg ${
                pathname === "/" && "!text-dark dark:!text-white"
              }`}
            >
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>
          <li>
            <Link
              href={"/search"}
              className={`text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white text-lg ${
                pathname === "/search" && "!text-dark dark:!text-white"
              }`}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Link>
          </li>
          <li>
            <Link
              href={"/create"}
              className={`text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white text-lg ${
                pathname === "/create" && "!text-dark dark:!text-white"
              }`}
            >
              <FontAwesomeIcon icon={faCirclePlus} />
            </Link>
          </li>
          <li>
            <Link
              href={"/notifications"}
              className={`text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white text-lg ${
                pathname === "/notifications" && "!text-dark dark:!text-white"
              }`}
            >
              <FontAwesomeIcon icon={faBell} />
            </Link>
          </li>
          <li>
            <Link
              href={"/profile"}
              className={`text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white text-lg ${
                pathname === "/profile" && "!text-dark dark:!text-white"
              }`}
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
