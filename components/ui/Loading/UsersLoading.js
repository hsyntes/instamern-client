import { motion } from "framer-motion";
import { v4 } from "uuid";

const UsersLoading = ({ count = 1, variant, className }) => {
  let containerClasses = `flex gap-3 p-4 rounded-lg ${className} `;

  switch (variant) {
    case "dark": {
      containerClasses += "bg-dark";
      break;
    }

    case "black": {
      containerClasses += "bg-black";
      break;
    }

    default: {
      containerClasses += "bg-gray-200";
      break;
    }
  }

  const loadingElements = [];

  for (let i = 0; i < count; i++)
    loadingElements.push(
      <motion.div
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
        className={containerClasses}
        key={v4()}
      >
        <div
          className={`relative overflow-hidden rounded-full bg-white ${
            variant === "dark" && "!bg-black"
          } ${variant === "black" && "!bg-dark-lighter"} w-4 p-4`}
        >
          <motion.div
            animate={{ x: [-100, 100] }}
            transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
            className="rounded-full"
            style={{
              boxShadow:
                variant === "dark" || variant === "black"
                  ? "0 0 32px 32px rgba(255, 255, 255, 0.2)"
                  : "0 0 32px 32px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
        <div className="w-full">
          <div
            className={`relative overflow-hidden bg-white ${
              variant === "dark" && "!bg-black"
            } ${
              variant === "black" && "!bg-dark-lighter"
            } rounded-lg w-1/2 py-1 mb-2`}
          >
            <motion.div
              animate={{ x: [-200, 200] }}
              transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
              className="rounded-full"
              style={{
                boxShadow:
                  variant === "dark" || variant === "black"
                    ? "0 0 32px 32px rgba(255, 255, 255, 0.2)"
                    : "0 0 32px 32px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
          <div
            className={`relative overflow-hidden bg-white ${
              variant === "dark" && "!bg-black"
            } ${
              variant === "black" && "!bg-dark-lighter"
            } rounded-lg w-1/3 py-1`}
          >
            <motion.div
              animate={{ x: [-200, 200] }}
              transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
              className="rounded-full"
              style={{
                boxShadow:
                  variant === "dark" || variant === "black"
                    ? "0 0 32px 32px rgba(255, 255, 255, 0.2)"
                    : "0 0 32px 32px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>
        </div>
      </motion.div>
    );

  return loadingElements;
};

export default UsersLoading;
