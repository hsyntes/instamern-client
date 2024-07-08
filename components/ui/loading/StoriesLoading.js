import { motion } from "framer-motion";
import { v4 } from "uuid";

const StoriesLoading = ({ count = 5, variant }) => {
  const loadingElements = [];

  for (let i = 0; i < count; i++)
    loadingElements.push(
      <section key={v4()}>
        <div className="relative w-12 h-12 rounded-full bg-gray-200 dark:bg-dark overflow-hidden mb-2">
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
        <div className="relative w-12 h-1.5 rounded-full bg-gray-200 dark:bg-dark overflow-hidden">
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
      </section>
    );

  return loadingElements;
};

export default StoriesLoading;
