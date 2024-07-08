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
      className="grid grid-cols-12 items-center overflow-x-scroll gap-6 select-none min-w-full"
      style={{ scrollbarWidth: "none" }}
    >
      {currentUser && (
        <section className="col-span-3 lg:col-span-1 border-r dark:border-r-dark pe-4">
          <section className="relative text-center cursor-pointer hover:opacity-90 hover:dark:opacity-75 transition-all mb-2">
            {currentUser.user_photo ? (
              <Image
                src={currentUser?.user_photo}
                width={350}
                height={350}
                className="w-12 lg:w-14 rounded-full mx-auto"
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
          <p className="text-sm text-center text-muted dark:text-muted-dark">
            Add story
          </p>
        </section>
      )}
      <section className="col-span-9 lg:col-span-11">
        {stories && (
          <ul className="flex items-center gap-6">
            {stories?.map((story) => (
              <StoryItem
                userId={story._id}
                storyId={story._id}
                key={story._id}
              />
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};

export default Stories;
