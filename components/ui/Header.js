import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Charm_700 } from "../Layout";
import Button from "./Button";
import MenuIcon from "./MenuIcon";
import BottomSheet from "./modals/BottomSheet";
import Stories from "./stories/Stories";

const Header = ({ stories }) => {
  const router = useRouter();

  const currentUserState = useSelector((state) => state.currentUser);
  const [bottomSheet, setBottomSheet] = useState(false);

  const { currentUser } = currentUserState;

  const handleBottomSheet = () => setBottomSheet(!bottomSheet);

  return (
    <>
      <header className="grid grid-cols-12 items-center sticky bg-white dark:bg-black lg:static top-0 py-6 lg:py-0 lg:mb-12 z-50">
        <section className="col-span-11 block lg:hidden">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={"/logo.svg"}
              width={96}
              height={96}
              className="w-6"
              alt="Logo"
            />
            <h1
              className={`text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ${Charm_700.className}`}
            >
              instamern
            </h1>
          </Link>
        </section>
        <section
          className={`${
            currentUser ? "col-span-12" : "col-span-11"
          }  hidden lg:block`}
        >
          <Stories stories={stories} />
        </section>
        <section className="col-span-1 block lg:hidden">
          <MenuIcon onClick={handleBottomSheet} />
        </section>
        <section className="lg:col-span-1 ms-auto hidden lg:block">
          {!currentUser && (
            <Button
              type={"button"}
              variant={"primary"}
              className={"rounded-xl ms-auto"}
              onClick={() => router.push("/auth/signup")}
            >
              Sign up
            </Button>
          )}
        </section>
      </header>
      <BottomSheet show={bottomSheet} handleBottomSheet={handleBottomSheet} />
    </>
  );
};

export default Header;
