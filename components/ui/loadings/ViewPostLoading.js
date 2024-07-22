import { motion } from "framer-motion";
import UsersLoading from "./UsersLoading";

const ViewPostLoading = ({ variant = "dark" }) => {
  return (
    <>
      <motion.section
        animate={{ opacity: [0, 1, 0] }}
        transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
        className={
          "w-full h-full relative flex items-center overflow-hidden !p-0 !m-0 border-r dark:border-r-dark bg-light dark:bg-black"
        }
      />
      <section className={"flex flex-col h-full lg:w-3/4 xl:w-1/2"}>
        <section className="mb-4">
          <UsersLoading variant={"dark"} count={1} />
        </section>
        <section>
          <UsersLoading variant={"dark"} count={8} />
        </section>
      </section>
    </>
  );
};

export default ViewPostLoading;
