import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSliceActions } from "@/store/user-slice/current-user-slice";
import { themeSliceActions } from "@/store/theme-slice/theme-slice";
import { motion } from "framer-motion";
import Offcanvas from "./Offcanvas";
import Input from "./inputs/Input";
import Dropdown from "./Dropdown";
import Collapse from "./Collapse";
import UsersLoading from "./loadings/UsersLoading";
import Modal from "./modals/Modal";
import AlertDialog from "./modals/AlertDialog";
import UsersList from "./users/UsersList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBell,
  faGear,
  faHeart,
  faHome,
  faPlusCircle,
  faSearch,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import useInput from "@/hooks/useInput";
import { logout, searchUsers } from "@/utils/helpers";

const Sidebar = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const themeState = useSelector((state) => state.theme);
  const currentUserState = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchOffcanvas, setSearchOffcanvas] = useState(false);
  const [notificationsOffcanvas, setNotificationsOffcanvas] = useState(false);
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [themeCollapse, setThemeCollapse] = useState(false);
  const [inputTheme, setInputTheme] = useState("white");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [loadingTheme, setLoadingTheme] = useState(null);
  const [createPostModal, setCreatePostModal] = useState(false);
  const [alertDialog, setAlertDialog] = useState(false);
  const [alertDialogMessage, setAlertDialogMessage] = useState("");
  const dropdownRef = useRef();

  const {
    state: { value: search, isValid: isSearchValid },
    handleOnChange: handleSearchOnChange,
    handleOnClear: handleSearchOnClear,
  } = useInput();

  const { pathname } = router;
  const { theme } = themeState;
  const { currentUser } = currentUserState;

  function handleSearchOffcanvas() {
    setSearchOffcanvas(!searchOffcanvas);
    if (notificationsOffcanvas) setNotificationsOffcanvas(false);
  }

  function handleNotificationsOffcanvas() {
    setNotificationsOffcanvas(!notificationsOffcanvas);
    if (searchOffcanvas) setSearchOffcanvas(false);
  }

  function handleCloseOffcanvasses() {
    setSearchOffcanvas(false);
    setNotificationsOffcanvas(false);
  }

  const handleSettingsDropdown = () => setSettingsDropdown(!settingsDropdown);
  const handleThemeCollapse = () => setThemeCollapse(!themeCollapse);
  const handleCloseCreatePostModal = () => setCreatePostModal(false);
  const handleOpenCreatePostModal = () => setCreatePostModal(true);
  const handleCloseAlertDialog = () => setAlertDialog(false);
  const handleOpenAlertDialog = () => setAlertDialog(true);

  const handleThemeOnChange = (e) =>
    dispatch(themeSliceActions.switchTheme(e.target.value));

  const { isLoading: isSearchedUsersLoading } = useQuery(
    ["searchUsers", search],
    {
      queryFn: async function () {
        if (isSearchValid) {
          const data = await searchUsers(search);

          if (data.status === "success") setSearchedUsers(data.data.users);
        } else setSearchedUsers([]);
      },

      refetchOnWindowFocus: false,
    }
  );

  const logoutMutation = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: function (data) {
      if (data.status === "success") {
        Cookies.remove("jsonwebtoken");
        dispatch(currentUserSliceActions.setCurrentUser(null));

        queryClient.refetchQueries({ queryKey: "getCurrentUser" });

        handleSettingsDropdown();
        router.push("/");
      }

      if (data.status === "fail" || data.status === "error") {
        handleOpenAlertDialog();
        setAlertDialogMessage(data.message);
      }
    },
  });

  useEffect(
    function () {
      if (theme === "dark") {
        setInputTheme("black");
        setLoadingTheme("black");
      }

      if (theme === "light") {
        setInputTheme("white");
        setLoadingTheme("light");
      }

      setSelectedTheme(theme);
    },
    [theme]
  );

  useEffect(
    function () {
      function handleClickOutside(e) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target) &&
          !e.target.classList.contains("dropdown")
        ) {
          setSettingsDropdown(false);
          setThemeCollapse(false);
        }
      }

      document.addEventListener("click", handleClickOutside, true);

      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    },
    [dropdownRef, setSettingsDropdown]
  );

  if (
    router.pathname.startsWith("/auth") ||
    router.pathname.startsWith("/story")
  )
    return;

  return (
    <>
      <aside className="hidden lg:flex border-r h-screen sticky top-0 select-none z-10">
        <div className="flex flex-col justify-center items-center bg-white dark:bg-black border-r dark:border-r-dark py-8 px-2 z-10">
          <Link href={"/"} className="mb-auto">
            <Image
              src={"/logo.svg"}
              width={96}
              height={96}
              className="w-7 hover:opacity-90 hover:dark:opacity-75 transition-all"
              alt="Logo"
              priority
            />
          </Link>
          <nav className="mb-auto">
            <ul className="space-y-6">
              <li>
                <Link
                  href={"/"}
                  className={`flex items-center justify-center text-muted dark:text-muted-dark hover:text-dark hover:bg-light hover:dark:bg-dark hover:dark:text-white rounded-full transition-all cursor-pointer p-2 ${
                    pathname === "/" && "!text-dark dark:!text-white"
                  }`}
                  onClick={handleCloseOffcanvasses}
                >
                  <FontAwesomeIcon icon={faHome} size="lg" />
                </Link>
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
                onClick={function () {
                  handleOpenCreatePostModal();
                  handleCloseOffcanvasses();
                }}
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
              <li>
                <Link
                  href={
                    currentUser
                      ? `/profile/${currentUser?.user_username}`
                      : "/auth/signup"
                  }
                  className={`flex items-center justify-center text-muted dark:text-muted-dark hover:text-dark hover:bg-light hover:dark:bg-dark hover:dark:text-white rounded-full transition-all cursor-pointer p-2 ${
                    currentUser &&
                    router.query.username === currentUser?.user_username &&
                    "!text-dark dark:!text-white"
                  }`}
                  onClick={handleCloseOffcanvasses}
                >
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </Link>
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
                  "backdrop-blur dark:backdrop-brightness-50 rounded-lg py-8 px-6 left-14 -bottom-1/2"
                }
                width={"225px"}
              >
                <Dropdown.Header className={"dropdown flex items-center gap-2"}>
                  <FontAwesomeIcon
                    icon={faGear}
                    className="dropdown"
                    size="sm"
                  />
                  <h6 className="dropdown text-sm font-semibold">Settings</h6>
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Body>
                  <ul className="dropdown text-sm font-semibold space-y-4">
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
                            checked={selectedTheme === "dark"}
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
                            className="dropdown"
                            onChange={handleThemeOnChange}
                            checked={selectedTheme === "light"}
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
                    {currentUser && (
                      <li
                        className="dropdown hover:text-primary cursor-pointer transition-all"
                        onClick={() => logoutMutation.mutate()}
                      >
                        Account Settings
                      </li>
                    )}
                    {currentUser && (
                      <li
                        className="dropdown text-danger cursor-pointer hover:text-danger-darker transition-all"
                        onClick={() => logoutMutation.mutate()}
                      >
                        Log out
                      </li>
                    )}
                  </ul>
                </Dropdown.Body>
              </Dropdown>
            </li>
          </ul>
        </div>
        <section>
          <Offcanvas show={searchOffcanvas}>
            <Offcanvas.Header handleOffcanvas={handleSearchOffcanvas}>
              <h1 className="text-lg font-semibold mb-2">Search</h1>
              <section className="relative">
                <Input
                  type={"text"}
                  name={"search"}
                  variant={inputTheme}
                  placeholder={"Search"}
                  className={"rounded-md"}
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
                <UsersList
                  users={searchedUsers}
                  onClick={handleSearchOffcanvas}
                />
              )}
            </Offcanvas.Body>
            <Offcanvas.Footer />
          </Offcanvas>
          <Offcanvas show={notificationsOffcanvas}>
            <Offcanvas.Header handleOffcanvas={handleNotificationsOffcanvas}>
              <h1 className="text-lg font-semibold flex items-center gap-2">
                <FontAwesomeIcon icon={faBell} />
                <span>Notifications</span>
              </h1>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ul>
                <li className="flex items-start gap-3 bg-white dark:bg-black rounded-lg shadow-sm p-4">
                  <Image
                    src={"/logo.svg"}
                    width={96}
                    height={96}
                    className="w-6"
                    alt="Logo"
                  />
                  <section>
                    <p className="text-sm">
                      Welcome to my application called&nbsp;
                      <strong>Instamern</strong>! It's a Full Stack Web
                      Application like Instagram built with Next.js & MERN.
                    </p>
                  </section>
                </li>
              </ul>
            </Offcanvas.Body>
            <Offcanvas.Footer />
          </Offcanvas>
        </section>
      </aside>
      <Modal
        show={createPostModal}
        handleCloseModal={handleCloseCreatePostModal}
      >
        <Modal.Header handleCloseModal={handleCloseCreatePostModal}>
          <h6 className="font-semibold">Create Post</h6>
        </Modal.Header>
      </Modal>
      <AlertDialog
        show={alertDialog}
        message={alertDialogMessage}
        handleCloseAlertDialog={handleCloseAlertDialog}
      />
    </>
  );
};

export default Sidebar;
