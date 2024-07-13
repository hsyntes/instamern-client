import { Charm_700 } from "@/components/Layout";
import Image from "next/image";

const Splash = () => (
  <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
    <section className="flex items-center justify-center gap-3 mb-auto mt-auto">
      <Image
        src={"/logo.svg"}
        width={96}
        height={96}
        className="w-8"
        alt="Logo"
      />
      <h1
        className={`text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ${Charm_700.className}`}
      >
        instamern
      </h1>
    </section>
    <section className="absolute text-center text-muted dark:text-muted-dark bottom-12 lg:bottom-6">
      <section>From</section>
      <h1 className="text-lg">Huseyin Ates</h1>
    </section>
  </div>
);

export default Splash;
