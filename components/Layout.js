import { Charm } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Sidebar from "./ui/Sidebar";
import Button from "./ui/Button";
import Container from "./Container";
import { useSelector } from "react-redux";
import { useEffect } from "react";

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
};

export default Layout;
