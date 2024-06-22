import { Charm } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Sidebar from "./ui/Sidebar";

export const Charm_700 = Charm({ subsets: ["latin"], weight: "700" });

config.autoAddCss = false;

const Layout = ({ children }) => (
  <div id="layout" className="lg:grid lg:grid-cols-12">
    <Sidebar />
    <main className="lg:col-span-9">
      {children}
      <div style={{ height: "1000px" }} />
    </main>
    <footer></footer>
  </div>
);
export default Layout;
