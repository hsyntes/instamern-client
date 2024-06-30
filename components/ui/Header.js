import Link from "next/link";
import Button from "./Button";
import Image from "next/image";
import { Charm_700 } from "../Layout";
import MenuIcon from "./MenuIcon";

const Header = () => {
  return (
    <header className="grid grid-cols-12 items-center">
      <section className="col-span-9 block lg:hidden">
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
      <section className="col-span-3 block lg:hidden">
        <MenuIcon />
      </section>
      <section className="col-span-3 lg:col-span-12 ms-auto hidden lg:block">
        <Button
          type={"button"}
          variant={"primary"}
          className={"rounded-xl ms-auto"}
          onClick={() => router.push("/auth/signup")}
        >
          Sign up
        </Button>
      </section>
    </header>
  );
};

export default Header;
