import React from "react";
import SideBar from "./SideBar";
import Head from "./Head";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <div className="flex flex-col">
      <Head />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
