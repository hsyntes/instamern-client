import { motion } from "framer-motion";

const StoriedByLoading = ({ variant, className }) => {
  return (
    <div className={`"w-1/3 lg:w-1/4 xl:w-1/5 ${className}`}>
      <motion.div
        animate={{ opacity: [0.75, 1, 0.75] }}
        className="flex items-center gap-3 mb-4"
        transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
      >
        <div
          className={`relative overflow-hidden rounded-full bg-white ${
            variant === "dark" && "!bg-dark-lighter"
          } w-4 p-4`}
        >
          <motion.div
            animate={{ x: [-100, 100] }}
            transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
            className="rounded-full"
            style={{
              boxShadow:
                variant === "dark"
                  ? "0 0 32px 32px rgba(255, 255, 255, 0.2)"
                  : "0 0 32px 32px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
        <div
          className={`w-14 relative overflow-hidden bg-white ${
            variant === "dark" && "!bg-dark-lighter"
          } rounded-full py-2`}
        >
          <motion.div
            animate={{ x: [-200, 200] }}
            transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
            className="rounded-full"
            style={{
              boxShadow:
                variant === "dark"
                  ? "0 0 32px 32px rgba(255, 255, 255, 0.2)"
                  : "0 0 32px 32px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
      </motion.div>
      <motion.div
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
        className={`w-full h-[70vh] rounded-lg bg-gray-300 ${
          variant === "dark" && "!bg-dark-lighter"
        } `}
      />
    </div>
  );
};

export default StoriedByLoading;
