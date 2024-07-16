import { motion } from "framer-motion";

const Spinner = ({ size }) => {
  let style;

  switch (size) {
    case "sm": {
      style = { width: "16px", height: "16px" };
      break;
    }

    case "lg": {
      style = { width: "32px", height: "32px" };
      break;
    }

    case "xl": {
      style = { width: "48px", height: "48px" };
      break;
    }

    default: {
      style = { width: "24px", height: "24px" };
      break;
    }
  }

  return (
    <motion.div
      animate={{ rotate: [0, 360] }}
      transition={{ ease: "easeOut", duration: 0.5, repeat: Infinity }}
      className="spinner border-t-2 border-t-primary border-2 border-white rounded-full"
      style={style}
    />
  );
};

export default Spinner;
