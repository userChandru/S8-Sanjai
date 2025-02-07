import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChartBarIcon, BuildingLibraryIcon } from '@heroicons/react/24/solid';
import { ChartBarIcon as ChartBarIconOutline, BuildingLibraryIcon as BuildingLibraryIconOutline } from '@heroicons/react/24/outline';
import { SiGoogleadsense } from "react-icons/si";
import { BiLogOut } from "react-icons/bi";

const AdminNavbar = () => {
  const location = useLocation();
  
  const Navitems = [
    {
      name: "Dashboard",
      link: "/admin/dashboard",
      active: ChartBarIcon,
      inactive: ChartBarIconOutline,
    },
    {
      name: "Bank",
      link: "/admin/bank",
      active: BuildingLibraryIcon,
      inactive: BuildingLibraryIconOutline,
    }
  ];

  return (
    <div className="pl-2 w-20 flex min-h-full flex-col items-center justify-between space-y-2 py-3 pb-10">
      <SiGoogleadsense className="size-10" />
      <div className="flex flex-col items-center justify-center space-y-5">
        {Navitems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className={`flex items-center justify-start space-x-2 rounded-full p-2 transition-all duration-100 ease-in-out ${
              location.pathname === item.link
                ? "bg-gray-900 ring-2 text-white ring-gray-400"
                : ""
            }`}
          >
            {location.pathname === item.link ? (
              <item.active className="size-7" />
            ) : (
              <item.inactive className="size-7" />
            )}
          </Link>
        ))}
      </div>
      <div className="bg-gray-900 text-white p-2 rounded-full flex items-center justify-center">
        <BiLogOut className="size-7" />
      </div>
    </div>
  );
};

export default AdminNavbar; 