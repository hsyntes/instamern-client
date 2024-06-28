import { useEffect } from "react";
import { useSelector } from "react-redux";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Charm } from "next/font/google";
import Sidebar from "./ui/Sidebar";
import Container from "./Container";

export const Charm_700 = Charm({ subsets: ["latin"], weight: "700" });

config.autoAddCss = false;

const Layout = ({ children }) => {
  const themeState = useSelector((state) => state.theme);

  const { theme } = themeState;

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("theme", theme);

    const [html, body] = [
      document.querySelector("html"),
      document.querySelector("body"),
    ];

    if (theme === "dark") {
      html.classList.add("dark");
      body.className = "bg-black text-white";
    }

    if (theme === "light") {
      html.classList.remove("dark");
      body.className = "bg-white text-dark";
    }
  }, [theme]);

  return (
    <div id="layout" className="lg:grid lg:grid-cols-12">
      <Sidebar />
      <main className="lg:col-span-9 py-6">
        <Container>
          {children}
          <div style={{ height: "1000px" }} />
        </Container>
      </main>
      <footer></footer>
    </div>
  );
};

export default Layout;
