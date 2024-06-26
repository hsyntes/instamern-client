import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Charm_700 } from "../Layout";
import Button from "./Button";
import MenuIcon from "./MenuIcon";
import BottomSheet from "./modal/BottomSheet";

const Header = () => {
  const router = useRouter();

  const currentUserState = useSelector((state) => state.currentUser);
  const [bottomSheet, setBottomSheet] = useState(false);

  const { currentUser } = currentUserState;

  const handleBottomSheet = () => setBottomSheet(!bottomSheet);

  return (
    <>
      <header className="grid grid-cols-12 items-center sticky top-0 transition-all py-6">
        <section className="col-span-9 block lg:hidden">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={"/logo.svg"}
              width={96}
              height={96}
              className="w-5"
              alt="Logo"
            />
            <h1
              className={`text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ${Charm_700.className}`}
            >
              instamern
            </h1>
          </Link>
        </section>
        <section className="col-span-3 block lg:hidden">
          <MenuIcon onClick={handleBottomSheet} />
        </section>
        <section className="col-span-3 lg:col-span-12 ms-auto hidden lg:block">
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
