import { useEffect } from "react";
import { motion } from "framer-motion";

const Toast = ({ show, variant, className, setToast, message }) => {
  if (!show) return null;

  let classes = `fixed left-1/2 -translate-x-1/2 bottom-8 w-3/4 lg:w-auto px-8 py-2 rounded border dark:border-dark shadow z-50 ${className} `;

  switch (variant) {
    case "danger": {
      classes += "bg-red-100 bg-opacity-15 text-red-500";
      break;
    }

    case "success": {
      classes += "bg-green-200 text-success";
      break;
    }

    default: {
      classes += "bg-white dark:bg-dark";
      break;
    }
  }

  useEffect(
    function () {
      const identifier = setTimeout(() => {
        setToast(false);
      }, 2000);

      return () => clearTimeout(identifier);
    },
    [setToast]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1] }}
      className={classes}
    >
      <p className="text-sm text-center select-none">{message}</p>
    </motion.div>
  );
};

export default Toast;
