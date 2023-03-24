import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
// import Footer from "../components/common/Footer";
import LayoutCSS from "./Layout.module.css";

function Layout() {
  return (
    <>
      <div className={LayoutCSS.wrapper}>
        <div className={LayoutCSS.navbar}>
          <Navbar />
        </div>

        <div className={LayoutCSS.content}>
          <Header />

          <main className={LayoutCSS.main}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;
