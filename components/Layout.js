import { Charm } from "next/font/google";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSliceActions } from "@/store/user-slice/current-user-slice";
import Sidebar from "./ui/Sidebar";
import Container from "./Container";
import Splash from "./ui/loading/Splash";
import Navbar from "./ui/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Cookies from "js-cookie";
import { getCurrentUser } from "@/utils/helpers";

export const Charm_700 = Charm({ subsets: ["latin"], weight: "700" });

config.autoAddCss = false;

const Layout = ({ children }) => {
  const themeState = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const { theme } = themeState;

  const { isLoading: isCurrentUserLoading } = useQuery({
    queryKey: "getCurrentUser",
    queryFn: async function () {
      if (Cookies.get("jsonwebtoken")) {
        const data = await getCurrentUser();

        if (data.status === "success")
          dispatch(
            currentUserSliceActions.setCurrentUser(data.data.currentUser)
          );
      }
    },
  });

  useEffect(
    function () {
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
    },
    [theme]
  );

  if (isCurrentUserLoading) return <Splash />;

  return (
    <div id="layout" className="relative flex items-start">
      <Sidebar />
      <main className="w-full transition-all border lg:py-8">
        <Container>{children}</Container>
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;
