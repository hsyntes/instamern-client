import { Charm } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import Navbar from "./ui/Navbar";

export const Charm_700 = Charm({ subsets: ["latin"], weight: "700" });

const Layout = ({ children }) => (
  <div id="layout" className="lg:grid lg:grid-cols-12">
    <Navbar />
    <main className="lg:col-span-9 py-4 lg:py-8">
      <header className="border-b pb-4">
        <Container>
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={"logo.svg"} className="w-6" width={96} height={96} />
            <h1
              className={`text-3xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ${Charm_700.className}`}
            >
              instamern
            </h1>
          </Link>
        </Container>
      </header>
      {children}
      <div style={{ height: "1000px" }} />
    </main>
    <footer></footer>
  </div>
);
export default Layout;
