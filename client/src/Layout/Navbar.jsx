import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChartBarIcon,
  BuildingLibraryIcon,
  IdentificationIcon,
  BanknotesIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import {
  ChartBarIcon as ChartBarIconOutline,
  BuildingLibraryIcon as BuildingLibraryIconOutline,
  IdentificationIcon as IdentificationIconOutline,
  BanknotesIcon as BanknotesIconOutline,
} from "@heroicons/react/24/outline";
import { BiLogOut } from "react-icons/bi";

import { SiGoogleadsense } from "react-icons/si";

import avatar from "../assets/img/avatar.png";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  let current;
  useEffect(() => {
    const current = location.pathname;
  }, [location.pathname]);
  const Navitems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      active: ChartBarIcon,
      inactive: ChartBarIconOutline,
    },
    {
      name: "Marketplace",
      link: "/marketplace",
      active: BanknotesIcon,
      inactive: BanknotesIconOutline,
    },
    {
      name: "Bank",
      link: "/bank",
      active: BuildingLibraryIcon,
      inactive: BuildingLibraryIconOutline,
    },
    {
      name: "Company",
      link: "/profile",
      active: IdentificationIcon,
      inactive: IdentificationIconOutline,
    },
  ];

  return (
    <div className=" pl-2 w-20 flex min-h-full flex-col items-center justify-between space-y-2 py-3 pb-10 ">
      <SiGoogleadsense className="size-10 " />
      <div className="flex flex-col items-center justify-center space-y-5">
        {Navitems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`flex items-center justify-start space-x-2 rounded-full p-2 transition-all duration-100 ease-in-out ${
              location.pathname === item.link
                ? " bg-gray-900 ring-2 text-white ring-gray-400"
                : ""
            } `}
          >
            {location.pathname === item.link ? (
              <item.active className=" size-7" />
            ) : (
              <item.inactive className=" size-7" />
            )}
          </Link>
        ))}
      </div>
      <div className=" bg-gray-900 text-white p-2 rounded-full flex  items-center justify-center">
        <BiLogOut  className="  size-7 "/>
      </div>
    </div>
  );
};

export default Navbar;
