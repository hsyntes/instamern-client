import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ show, handleCloseModal, className, children }) => {
  const [display, setDisplay] = useState("none");
  const modalOverlayRef = useRef();

  if (typeof window !== "undefined")
    window.addEventListener("keyup", function (e) {
      if (e.key === "Escape") handleCloseModal();
    });

  useEffect(
    function () {
      const handleClickOutside = (e) => {
        if (
          modalOverlayRef &&
          modalOverlayRef.current &&
          e.target.id === "modal-overlay"
        )
          handleCloseModal();
      };

      document.addEventListener("click", handleClickOutside, true);

      return () =>
        document.removeEventListener("click", handleClickOutside, true);
    },
    [modalOverlayRef, handleCloseModal]
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

  useEffect(
    function () {
      if (show) document.body.style.overflowY = "hidden";
      if (!show) document.body.style.overflowY = "auto";
    },
    [show]
  );

  return createPortal(
    <div
      id="modal-overlay"
      className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-muted-dark dark:bg-muted border select-none z-50"
      style={{ display }}
      ref={modalOverlayRef}
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: show ? [1.1, 1] : [1, 0.9] }}
        className={`modal absolute top-1/2 left-1/2 w-3/4 lg:w-1/3 xl:w-1/4 bg-white dark:bg-dark rounded-lg border dark:border-dark shadow py-6 px-8 z-50 ${className}`}
        style={{
          transformOrigin: "center",
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {children}
      </motion.div>
    </div>,
    document.getElementById("modal-backdrop")
  );
};

const ModalHeader = ({ handleCloseModal, className, children }) => (
  <div
    className={`modal-header flex items-center justify-between ${className}`}
  >
    {children}
    <FontAwesomeIcon
      icon={faTimes}
      size="lg"
      className="cursor-pointer ms-auto"
      onClick={handleCloseModal}
    />
  </div>
);

const ModalBody = ({ className, children }) => (
  <div className={`modal-body my-8 ${className}`}>{children}</div>
);

const ModalFooter = ({ className, children }) => (
  <div className={`modal-footer flex items-center ${className}`}>
    {children}
  </div>
);

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
