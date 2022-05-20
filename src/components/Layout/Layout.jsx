import "./Layout.css";

import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="layout">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
