import Image from "next/image";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import StoryItem from "./StoryItem";

const Stories = ({ stories }) => {
  const currentUserState = useSelector((state) => state.currentUser);
  const { currentUser } = currentUserState;

  console.log("stories: ", stories);

  return (
    <section className="grid grid-cols-12 gap-4 select-none">
      {currentUser && (
        <section className="col-span-1">
          <section className="relative text-center cursor-pointer hover:opacity-90 hover:dark:opacity-75 transition-all mb-2">
            {currentUser?.user_photo ? (
              <Image
                src={currentUser.user_photo}
                width={350}
                height={350}
                className="w-12 rounded-full mx-auto"
                alt="Profile Photo"
                priority
              />
            ) : (
              <Avatar name={currentUser?.user_fullname} size={"sm"} />
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
      <section className="col-span-11">
        {stories?.map((story) => (
          <StoryItem
            userId={story._id}
            photos={story.story_photos}
            key={story._id}
          />
        ))}
      </section>
    </section>
  );
};

export default Stories;