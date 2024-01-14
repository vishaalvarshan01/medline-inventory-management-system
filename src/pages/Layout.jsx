import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const auth = { token: false };

  return auth.token ? (
    <Navigate to="/" />
  ) : (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 overflow-x-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
