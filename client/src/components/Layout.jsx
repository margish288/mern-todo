import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import CreateTask from "./CreateTask";
import Header from "./Header";

const Layout = () => {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="order-1">
          <div className="p-4">
            <CreateTask />
          </div>
        </div>
        <div className="order-2">
          <div className="container mx-auto mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
