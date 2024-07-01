import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import Container from "../Container";
import {
  faHome,
  faSearch,
  faCirclePlus,
  faHeart as faHeartSolid,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const router = useRouter();
  const currentUserState = useSelector((state) => state.currentUser);

  const { pathname } = router;
  const { currentUser } = currentUserState;

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
              <FontAwesomeIcon
                icon={
                  pathname === "/notifications" ? faHeartSolid : faHeartRegular
                }
                size="lg"
              />
            </Link>
          </li>
          <li>
            <Link
              href={`/profile/${currentUser?.user_username}`}
              className={`text-muted dark:text-muted-dark hover:text-dark hover:dark:text-white ${
                currentUser &&
                router.query.username === currentUser?.user_username &&
                "!text-dark dark:!text-white"
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
