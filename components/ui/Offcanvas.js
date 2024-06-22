import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Charm_700 } from "../Layout";
import { motion } from "framer-motion";

const Offcanvas = ({ show, className, children }) => (
  <motion.div
    initial={{ translateX: "0%" }}
    animate={{ translateX: show ? "0%" : "-100%" }}
    // transition={{ ease: "easeOut", duration: 0.2 }}
    className={`offcanvas flex flex-col bg-light dark:bg-dark w-full h-screen z-40 ${className}`}
  >
    {children}
  </motion.div>
);

const OffcanvasHeader = ({ handleOffcanvas, className, children }) => (
  <div className={`offcanvas-header px-4 py-3 ${className}`}>
    <section className="flex items-center justify-between mb-4">
      <h1
        className={`text-3xl bg-gradient-to-r from-primary to-secondary to-70% bg-clip-text text-transparent select-none ${Charm_700.className}`}
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
    className={`offcanvas-body h-full overflow-y-scroll p-4`}
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
