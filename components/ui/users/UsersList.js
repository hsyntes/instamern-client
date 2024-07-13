import Image from "next/image";
import Link from "next/link";
import Avatar from "../Avatar";
import Button from "../Button";

const UsersList = ({ users, onClick }) => (
  <ul>
    {users.map((user) => (
      <li className="flex items-center mb-4 last:mb-0" key={user._id}>
        <Link
          href={`/profile/${user.user_username}`}
          className="flex items-center gap-3 w-full group me-auto"
          onClick={onClick}
        >
          {user.user_photo ? (
            <Image
              src={user.user_photo}
              width={350}
              height={350}
              className="rounded-full w-9"
              alt="Profile Photo"
            />
          ) : (
            <Avatar name={user?.user_fullname} size={"lg"} />
          )}
          <section>
            <h1 className="text-sm">{user.user_fullname}</h1>
            <p className="text-xs text-muted dark:text-muted-dark group-hover:text-dark group-hover:dark:!text-white group-active:text-dark group-active:dark:!text-white transition-all">
              {user.user_username}
            </p>
          </section>
        </Link>
        <Button type={"button"} variant={"link"} className={"ms-auto"}>
          Follow
        </Button>
      </li>
    ))}
  </ul>
);

export default UsersList;
