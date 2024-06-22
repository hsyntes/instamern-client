import { Charm } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Sidebar from "./ui/Sidebar";
import Button from "./ui/Button";
import Container from "./Container";

export const Charm_700 = Charm({ subsets: ["latin"], weight: "700" });

config.autoAddCss = false;

const Layout = ({ children }) => (
  <div id="layout" className="lg:grid lg:grid-cols-12">
    <Sidebar />
    <main className="lg:col-span-10 py-4">
      <Container>
        <header className="flex items-center justify-end">
          <Button type={"button"} variant={"primary"}>
            Sign up
          </Button>
        </header>
        {children}
        <div style={{ height: "1000px" }} />
      </Container>
    </main>
    <footer></footer>
  </div>
);
export default Layout;
