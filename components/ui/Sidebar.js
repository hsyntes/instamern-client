import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { themeSliceActions } from "@/store/theme-slice/theme-slice";
import { motion } from "framer-motion";
import Offcanvas from "./Offcanvas";
import Input from "./form/Input";
import Dropdown from "./Dropdown";
import Collapse from "./Collapse";
import UsersLoading from "./loading/UsersLoading";
import Avatar from "./Avatar";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faGear,
  faHeart,
  faHome,
  faPlusCircle,
  faSearch,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import useInput from "@/hooks/useInput";
import HttpRequest from "@/utils/HttpRequest";

const searchUsers = async (payload) =>
  await HttpRequest.get(`users/search/${payload}`);

const Sidebar = () => {
  const router = useRouter();

  const themeState = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchOffcanvas, setSearchOffcanvas] = useState(false);
  const [notificationsOffcanvas, setNotificationsOffcanvas] = useState(false);
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [themeCollapse, setThemeCollapse] = useState(false);
  const [inputTheme, setInputTheme] = useState("white");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [loadingTheme, setLoadingTheme] = useState("");
  const dropdownRef = useRef();

  const {
    state: { value: search, isValid: isSearchValid },
    handleOnChange: handleSearchOnChange,
    handleOnClear: handleSearchOnClear,
  } = useInput();

  const { pathname } = router;
  const { theme } = themeState;

  const handleSearchOffcanvas = () => {
    setSearchOffcanvas(!searchOffcanvas);

    if (notificationsOffcanvas) setNotificationsOffcanvas(false);
  };

  const handleNotificationsOffcanvas = () => {
    setNotificationsOffcanvas(!notificationsOffcanvas);

    if (searchOffcanvas) setSearchOffcanvas(false);
  };

  const handleSettingsDropdown = () => setSettingsDropdown(!settingsDropdown);
  const handleThemeCollapse = () => setThemeCollapse(!themeCollapse);

  const handleThemeOnChange = (e) =>
    dispatch(themeSliceActions.switchTheme(e.target.value));

  const { isLoading: isSearchedUsersLoading } = useQuery(
    ["searchUsers", search],
    {
      queryFn: async () => {
        if (isSearchValid) {
          const data = await searchUsers(search);
          console.log("data: ", data);

          if (data.status === "success") setSearchedUsers(data.data.users);
        } else setSearchedUsers([]);
      },

      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (theme === "dark") setInputTheme("black");
    if (theme === "light") setInputTheme("white");

    setSelectedTheme(theme);
  }, [theme, selectedTheme]);

  useEffect(() => {
    if (theme === "dark") setLoadingTheme("black");
    if (theme === "light") setLoadingTheme("light");
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.classList.contains("dropdown")
      )
        setSettingsDropdown(false);
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [dropdownRef, setSettingsDropdown]);

  return (
    <aside className="hidden lg:flex lg:col-span-3 h-screen sticky top-0">
      <div className="flex flex-col justify-center items-center bg-white dark:bg-black border-r dark:border-r-dark py-6 px-2 z-50">
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
          <li className="block relative justify-center text-dark dark:text-white hover:bg-light hover:dark:bg-dark rounded-full transition-all">
            <FontAwesomeIcon
              icon={faGear}
              size="lg"
              className="cursor-pointer p-2"
              onClick={handleSettingsDropdown}
              ref={dropdownRef}
            />
            <Dropdown
              show={settingsDropdown}
              setDropdown={setSettingsDropdown}
              className={
                "backdrop-blur dark:backdrop-brightness-50 rounded-lg p-4 left-full bottom-0"
              }
              width={"175px"}
            >
              <Dropdown.Header className={"dropdown flex items-center gap-2"}>
                <FontAwesomeIcon icon={faGear} className="dropdown" size="sm" />
                <h6 className="dropdown text-sm font-semibold">Settings</h6>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Body>
                <ul className="dropdown text-sm font-semibold space-y-3">
                  <li>
                    <section
                      className={`dropdown flex items-center justify-between cursor-pointer hover:text-primary ${
                        themeCollapse && "text-primary"
                      }`}
                      onClick={handleThemeCollapse}
                    >
                      <span className="dropdown">Theme</span>
                      <motion.span
                        className="dropdown"
                        animate={{
                          rotateZ: themeCollapse ? "180deg" : "0deg",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faAngleDown}
                          className="dropdown"
                        />
                      </motion.span>
                    </section>
                    <Collapse className={"dropdown"} show={themeCollapse}>
                      <section className="dropdown flex items-center gap-1">
                        <input
                          type="radio"
                          id="dark"
                          name="theme"
                          value={"dark"}
                          className="dropdown"
                          onChange={handleThemeOnChange}
                          defaultChecked={selectedTheme === "dark"}
                        />
                        <label
                          htmlFor="dark"
                          className="dropdown font-normal block cursor-pointer"
                        >
                          Dark
                        </label>
                      </section>
                      <section className="dropdown flex items-center gap-1">
                        <input
                          type="radio"
                          id="light"
                          name="theme"
                          value={"light"}
                          onChange={handleThemeOnChange}
                          className="dropdown"
                          defaultChecked={selectedTheme === "light"}
                        />
                        <label
                          htmlFor="light"
                          className="dropdown font-normal block cursor-pointer"
                        >
                          Light
                        </label>
                      </section>
                    </Collapse>
                  </li>
                  <li className="dropdown text-danger">Log out</li>
                </ul>
              </Dropdown.Body>
            </Dropdown>
          </li>
        </ul>
      </div>
      <section className="w-full">
        <Offcanvas show={searchOffcanvas}>
          <Offcanvas.Header handleOffcanvas={handleSearchOffcanvas}>
            <h1 className="text-lg font-semibold mb-2">Search</h1>
            <section className="relative">
              <Input
                type={"text"}
                name={"search"}
                variant={inputTheme}
                placeholder={"Search"}
                value={search}
                onChange={handleSearchOnChange}
                autoFocus={true}
              />
              {isSearchValid ? (
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  size="sm"
                  className="absolute text-muted dark:text-muted-dark hover:!text-dark hover:dark:!text-white top-1/2 right-2 -translate-y-1/2 cursor-pointer transition-all"
                  onClick={() => handleSearchOnClear("search")}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faSearch}
                  size="sm"
                  className="absolute text-muted dark:text-muted-dark top-1/2 right-2 -translate-y-1/2"
                />
              )}
            </section>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {isSearchedUsersLoading && (
              <UsersLoading
                count={10}
                variant={loadingTheme}
                className={"mb-4 last:mb-0"}
              />
            )}
            {!isSearchedUsersLoading && searchedUsers.length !== 0 && (
              <ul>
                {searchedUsers.map((searchedUser) => (
                  <li className="flex mb-4 last:mb-0" key={searchedUser._id}>
                    <Link href={"/"} className="flex gap-3">
                      {searchedUser.user_photo ? (
                        <Image src={searchedUser.user_photo} />
                      ) : (
                        <Avatar
                          size={"lg"}
                          letter={searchedUser.user_fullname.slice(0, 1)}
                        />
                      )}
                      <section className="text-sm">
                        <h1>{searchedUser.user_fullname}</h1>
                        <p>{searchedUser.user_username}</p>
                      </section>
                    </Link>
                    <Button
                      type={"button"}
                      variant={"link"}
                      className={"ms-auto"}
                    >
                      Follow
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Offcanvas.Body>
          <Offcanvas.Footer />
        </Offcanvas>
        <Offcanvas show={notificationsOffcanvas}>
          <Offcanvas.Header handleOffcanvas={handleNotificationsOffcanvas}>
            <h1 className="text-lg font-semibold mb-2">Notifications</h1>
          </Offcanvas.Header>
          <Offcanvas.Body />
          <Offcanvas.Footer />
        </Offcanvas>
      </section>
    </aside>
  );
};

export default Sidebar;
