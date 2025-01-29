import React from "react";
import avatar from "../assets/img/Avatar.png";
import Userdata from "../data/Userdata";
const Sidebar = () => {
  return (
    <div className=" w-full h-full p-2 bg-white rounded-xl">
      <div className=" flex items-center p-3  rounded-xl bg-gray-100  space-x-5 justify-between ">
        <div className=" text-slate-700 flex-1 flex flex-col   items-start justify-end font-semibold  text-right"></div>
        <img
          src={avatar}
          className=" bg-white flex-2 rounded-full overflow-hidden h-20"
        />
      </div>
    </div>
  );
};

export default Sidebar;
