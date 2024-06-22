import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Dropdown = ({ show, width, className, children }) => {
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (!show) setDisplay("none");
    }, 100);

    if (show) setDisplay("block");

    return () => clearTimeout(identifier);
  }, [show]);

  return (
    <div style={{ display }} className="dropdown">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: show ? [0.9, 1] : [1, 0.9],
          opacity: show ? [0, 1] : [1, 0],
        }}
        className={`dropdown absolute rounded border dark:border-dark select-none z-50 ${className}`}
        style={{ width }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const DropdownHeader = ({ className, children }) => (
  <div className={`dropdown dropdown-header ${className}`}>{children}</div>
);

const DropdownDivider = ({}) => (
  <hr className="dropdown dark:border-dark my-3" />
);

const DropdownBody = ({ children }) => (
  <div className="dropdown dropdown-body">{children}</div>
);

Dropdown.Header = DropdownHeader;
Dropdown.Divider = DropdownDivider;
Dropdown.Body = DropdownBody;

export default Dropdown;
