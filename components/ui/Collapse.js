import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Collapse = ({ show, className, children }) => {
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    if (!show) setDisplay("none");
    if (show) setDisplay("block");
  }, [show]);

  return (
    <div className={className} style={{ display }}>
      {children}
    </div>
  );
};

export default Collapse;
