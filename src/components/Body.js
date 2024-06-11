import React from "react";
import SideBar from "./SideBar";
import Head from "./Head";
import { Outlet } from "react-router";

const Body = () => {
  return (
    <div className="flex flex-col w-full">
      <Head />
      <div className="flex flex-row">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
