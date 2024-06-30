import { Charm } from "next/font/google";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { currentUserSliceActions } from "@/store/user-slice/current-user-slice";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Sidebar from "./ui/Sidebar";
import Container from "./Container";
import Splash from "./ui/loading/Splash";
import Cookies from "js-cookie";
import HttpRequest from "@/utils/HttpRequest";
import Navbar from "./ui/Navbar";

export const Charm_700 = Charm({ subsets: ["latin"], weight: "700" });

const getCurrentUser = async () =>
  await HttpRequest.get(
    "/auth/current-user",
    undefined,
    Cookies.get("jsonwebtoken")
  );

config.autoAddCss = false;

const Layout = ({ children }) => {
  const themeState = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const { theme } = themeState;

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

  const { isLoading: isCurrentUserLoading } = useQuery({
    queryKey: "getCurrentUser",
    queryFn: async function () {
      const data = await getCurrentUser();

      if (data.status === "success")
        dispatch(currentUserSliceActions.setCurrentUser(data.data.currentUser));
    },
    refetchOnWindowFocus: false,
  });

  if (isCurrentUserLoading) return <Splash />;

  return (
    <div id="layout" className="lg:grid lg:grid-cols-12">
      <Sidebar />
      <main className="lg:col-span-9 py-6">
        <Container>
          {children}
          {/* <div style={{ height: "1000px" }} /> */}
        </Container>
      </main>
      <Navbar />
      <footer></footer>
    </div>
  );
};

export default Layout;
