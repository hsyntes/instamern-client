import { useEffect, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Charm_700 } from "../Layout";
import { motion } from "framer-motion";

const Offcanvas = ({ show, className, children }) => {
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (!show) setDisplay("none");
    }, 100);

    if (show) setDisplay("block");

    return () => clearTimeout(identifier);
  }, [show]);

  return (
    <div style={{ display, width: "25vw" }}>
      <motion.div
        initial={{ translateX: "-100%" }}
        animate={{ translateX: show ? "0%" : "-100%" }}
        // transition={{ ease: "easeOut", duration: 0.2 }}
        className={`offcanvas rounded-tr-3xl flex flex-col bg-light dark:bg-dark-darker w-full h-screen z-40 border-r border-t dark:border-r-dark dark:border-t-dark select-none ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

const OffcanvasHeader = ({ handleOffcanvas, className, children }) => (
  <div className={`offcanvas-header px-4 py-3 ${className}`}>
    <section className="flex items-center justify-between mb-6">
      <h1
        className={`text-3xl bg-gradient-to-r from-primary to-secondary to-70% bg-clip-text text-transparent ${Charm_700.className}`}
      >
        instamern
      </h1>
      <FontAwesomeIcon
        icon={faTimes}
        size="lg"
        className="cursor-pointer text-muted dark:text-muted-dark hover:!text-secondary transition-all"
        onClick={handleOffcanvas}
      />
    </section>
    <section>{children}</section>
  </div>
);

const OffcanvasBody = ({ handleOffcanvas, className, children }) => (
  <div
    className={`offcanvas-body mt-auto mb-auto border h-full overflow-y-scroll p-4`}
    style={{ scrollbarWidth: "none" }}
  >
    {children}
  </div>
);

const OffcanvasFooter = ({}) => (
  <div className={`offcanvas-footer mt-auto border-t dark:border-t-dark p-4`}>
    <p>SADSA</p>
  </div>
);

Offcanvas.Header = OffcanvasHeader;
Offcanvas.Body = OffcanvasBody;
Offcanvas.Footer = OffcanvasFooter;

export default Offcanvas;
