import Image from "next/image";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import StoryItem from "./StoryItem";

const Stories = ({ stories }) => {
  const currentUserState = useSelector((state) => state.currentUser);
  const { currentUser } = currentUserState;

  return (
    <section
      id="stories-slider"
      className="flex items-center gap-6 select-none min-w-full overflow-x-scroll"
      style={{ scrollbarWidth: "none" }}
    >
      {currentUser && (
        <section className="">
          <section className="relative text-center cursor-pointer hover:opacity-90 hover:dark:opacity-75 transition-all mb-2">
            {currentUser.user_photo ? (
              <Image
                src={currentUser?.user_photo}
                width={350}
                height={350}
                className="w-14 rounded-full mx-auto"
                alt="User Profile Photo"
                priority
              />
            ) : (
              <Avatar
                name={currentUser?.user_username}
                size={"xl"}
                className={"mx-auto"}
              />
            )}
            <span className="absolute bottom-0 right-0 translate-y-1/2">
              <FontAwesomeIcon icon={faPlusCircle} className="text-primary" />
            </span>
          </section>
          <p className="text-sm text-center text-muted dark:text-muted-dark text-nowrap">
            Add story
          </p>
        </section>
      )}
      <section className="w-full">
        {stories && (
          <ul className="flex items-center gap-6">
            {stories?.map((story) => (
              <StoryItem userId={story._id} key={story._id} />
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};

export default Stories;
