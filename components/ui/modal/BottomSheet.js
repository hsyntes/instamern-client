import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSliceActions } from "@/store/user-slice/current-user-slice";
import AlertDialog from "./AlertDialog";
import { motion } from "framer-motion";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { themeSliceActions } from "@/store/theme-slice/theme-slice";
import Cookies from "js-cookie";
import { logout } from "@/utils/helpers";

const BottomSheet = ({ show, handleBottomSheet }) => {
  const queryClient = useQueryClient();

  const themeState = useSelector((state) => state.theme);
  const currentUserState = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const [alertDialog, setAlertDialog] = useState(false);
  const [alertDialogMessage, setAlertDialogMessage] = useState("");
  const [display, setDisplay] = useState("none");
  const bottomSheetRef = useRef();

  const { theme } = themeState;
  const { currentUser } = currentUserState;

  const handleAlertDialog = () => setAlertDialog(!alertDialog);

  function handleSwitchTheme() {
    dispatch(
      themeSliceActions.switchTheme(theme === "dark" ? "light" : "dark")
    );

    handleBottomSheet();
  }

  const logoutMutation = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: function (data) {
      if (data.status === "success") {
        Cookies.remove("jsonwebtoken");
        dispatch(currentUserSliceActions.setCurrentUser(null));

        queryClient.refetchQueries({ queryKey: "getCurrentUser" });

        handleBottomSheet();

        //! Canceled due to lose initial props at index.js (HomePage)
        // router.push("/");

        window.location.href = "/";
      }

      if (data.status === "fail" || data.status === "error") {
        handleAlertDialog();
        setAlertDialogMessage(data.message);
      }
    },
  });

  useEffect(
    function () {
      const handleClickOutside = (e) => {
        if (
          bottomSheetRef &&
          bottomSheetRef.current &&
          e.target.id === "bottom-sheet-overlay"
        )
          handleBottomSheet();
      };

      document.addEventListener("click", handleClickOutside, true);

      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    },
    [bottomSheetRef, handleBottomSheet]
  );

  useEffect(
    function () {
      const identifier = setTimeout(function () {
        if (!show) setDisplay("none");
      }, 100);

      if (show) setDisplay("block");

      return () => clearTimeout(identifier);
    },
    [show]
  );

  return (
    <>
      <div
        ref={bottomSheetRef}
        className="fixed top-0 left-0 w-screen h-screen z-50"
        id="bottom-sheet-overlay"
        style={{ display }}
      >
        <motion.div
          animate={{ translateY: show ? "0%" : "100%" }}
          transition={{ ease: "easeOut", duration: 0.2 }}
          className="absolute bottom-0 w-full h-1/5 bg-white dark:bg-dark rounded-t-3xl border dark:border-dark shadow py-6"
        >
          <div className="py-0.5 bg-muted dark:bg-muted-dark w-1/6 rounded-full mx-auto mb-3"></div>
          <section
            className={
              "flex flex-col w-full h-full items-center justify-center"
            }
          >
            <ul className="text-center text-sm w-full px-4">
              <li
                className="flex items-center justify-center gap-2 active:bg-muted active:dark:bg-muted-dark font-semibold rounded-lg transition-all py-2"
                onClick={handleSwitchTheme}
              >
                <FontAwesomeIcon icon={faMoon} />
                <span>Switch Theme</span>
              </li>
              {currentUser ? (
                <li
                  className="active:bg-red-100 rounded-lg text-danger font-semibold transition-all py-2"
                  onClick={() => logoutMutation.mutate()}
                >
                  Log out
                </li>
              ) : (
                <li className="active:bg-muted active:dark:bg-muted-dark hover:text-primary active:text-primary font-semibold rounded-lg transition-all py-2">
                  <Link href={"/auth/signup"} onClick={handleBottomSheet}>
                    Sign up
                  </Link>
                </li>
              )}
            </ul>
          </section>
        </motion.div>
      </div>
      <AlertDialog
        show={alertDialog}
        message={alertDialogMessage}
        handleAlertDialog={handleAlertDialog}
      />
    </>
  );
};

export default BottomSheet;
