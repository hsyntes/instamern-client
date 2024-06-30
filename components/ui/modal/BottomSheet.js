import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { themeSliceActions } from "@/store/theme-slice/theme-slice";

const BottomSheet = ({ show, handleBottomSheet }) => {
  const themeState = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const [display, setDisplay] = useState("none");
  const bottomSheetRef = useRef();

  const { theme } = themeState;

  function handleSwitchTheme() {
    dispatch(
      themeSliceActions.switchTheme(theme === "dark" ? "light" : "dark")
    );

    handleBottomSheet();
  }

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
          className={"flex flex-col w-full h-full items-center justify-center"}
        >
          <ul className="text-center text-sm w-full px-4">
            <li
              className="flex items-center justify-center gap-2 active:bg-muted active:dark:bg-muted-dark font-semibold rounded-lg transition-all py-2"
              onClick={handleSwitchTheme}
            >
              <FontAwesomeIcon icon={faMoon} />
              <span>Switch Theme</span>
            </li>
            <li className="active:bg-red-100 rounded-lg text-danger font-semibold transition-all py-2">
              <span>Log out</span>
            </li>
          </ul>
        </section>
      </motion.div>
    </div>
  );
};

export default BottomSheet;
