import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Sidebar from "../Layout/Sidebar";

const HomePage = () => {
  const location = useLocation();

  const Navitems = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Marketplace",
      link: "/marketplace",
    },
    {
      name: "Bank",
      link: "/bank",
    },
    {
      name: "Company",
      link: "/profile",
    },
  ];

  const currentNavItem = Navitems.find(
    (item) => item.link === location.pathname
  );

  return (
    <div className="flex relative ">
      <Navbar />
      <div className="bg-white m-2 rounded-2xl h-[97.5vh] overflow-scroll  scrollbar-none w-full">
        <header className=" sticky top-0 z-20 bg-white  p-3">
          <p className=" text-3xl  font-semibold">
            {currentNavItem ? currentNavItem.name : "Page Not Found"}
          </p>
        </header>
        <Outlet />
      </div>
      <div className=" w-[35vw] my-2 mr-2">
        <Sidebar />
      </div>
    </div>
  );
};

export default HomePage;
