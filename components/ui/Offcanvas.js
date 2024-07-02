import { useEffect, useState } from "react";
import { faEarth, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Charm_700 } from "../Layout";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Offcanvas = ({ show, className, children }) => {
  const [display, setDisplay] = useState("none");

  useEffect(
    function () {
      const identifier = setTimeout(() => {
        if (!show) setDisplay("none");
      }, 100);

      if (show) setDisplay("block");

      return () => clearTimeout(identifier);
    },
    [show]
  );

  return (
    <div
      style={{
        display,
        width:
          typeof window !== "undefined" && window.innerWidth >= 1356
            ? "25vw"
            : "30vw",
      }}
    >
      <motion.div
        initial={{ translateX: "-100%" }}
        animate={{ translateX: show ? "0%" : "-100%" }}
        // transition={{ ease: "easeOut", duration: 0.2 }}
        className={`offcanvas rounded-tr-3xl flex flex-col bg-light dark:bg-dark w-full h-screen border-r border-t dark:border-r-dark dark:border-t-dark select-none z-40 ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};

const OffcanvasHeader = ({ handleOffcanvas, className, children }) => (
  <div className={`offcanvas-header px-4 py-5 ${className}`}>
    <section className="flex items-center justify-between mb-4">
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
    className={`offcanvas-body h-full overflow-y-scroll px-4 ${className}`}
    style={{ scrollbarWidth: "none" }}
  >
    {children}
  </div>
);

const OffcanvasFooter = ({}) => (
  <div
    className={`offcanvas-footer flex items-start gap-3 mt-auto border-t dark:border-t-dark p-4`}
  >
    <Image
      src={"https://avatars.githubusercontent.com/u/69708483?v=4"}
      width={32}
      height={32}
      className="rounded-full"
      alt="Husyin Ates"
    />
    <section>
      <h1 className="text-sm">Huseyin Ates</h1>
      <p className="text-xs text-muted dark:text-muted-dark">
        Full Stack Developer
      </p>
    </section>
    <section className="flex items-center gap-3 ms-auto">
      <Link
        href={"https://hsyntes.com"}
        target="_blank"
        className="text-muted dark:text-muted-dark hover:!text-dark hover:dark:!text-white transition-all"
      >
        <FontAwesomeIcon icon={faEarth} />
      </Link>
      <Link
        href={"https://github.com/hsyntes"}
        target="_blank"
        className="text-muted dark:text-muted-dark hover:!text-dark hover:dark:!text-white transition-all"
      >
        <FontAwesomeIcon icon={faGithub} />
      </Link>
      <Link
        href={"https://linkedin.com/in/hsyntes"}
        target="_blank"
        className="text-muted dark:text-muted-dark hover:!text-dark hover:dark:!text-white transition-all"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </Link>
    </section>
  </div>
);

Offcanvas.Header = OffcanvasHeader;
Offcanvas.Body = OffcanvasBody;
Offcanvas.Footer = OffcanvasFooter;

export default Offcanvas;
