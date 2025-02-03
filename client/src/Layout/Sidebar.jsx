import React, { useState, useEffect } from "react";
import avatar from "../assets/img/Avatar.png";
import Userdata from "../data/Userdata";
import { RiShoppingBag3Fill } from "react-icons/ri";
import Lottie from "lottie-react";
import Garbagecan from "../assets/Animation/garbage.json"

const Sidebar = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Convert to IST (UTC+5:30)
      const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      const hours = istTime.getUTCHours().toString().padStart(2, '0');
      const minutes = istTime.getUTCMinutes().toString().padStart(2, '0');
      const seconds = istTime.getUTCSeconds().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    // Update immediately
    updateTime();
    // Update every minute
    const interval = setInterval(updateTime, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" flex flex-col w-full h-full p-2 space-y-2 bg-white rounded-xl">
      <div className="flex flex-col items-center justify-center p-3  rounded-xl bg-gray-100  ">
        <p className=" font-bold text-8xl font-mono tracking-wider">{time}</p>
        <p className=" text-2xl font-semibold">Trade Zone Duration</p>
      </div>
      <div className=" flex items-center p-3  rounded-xl bg-gray-100  space-x-5 justify-between ">
        <div className=" text-slate-700 flex-1 flex flex-col   items-start justify-end font-semibold  text-right">
          <p className=" text-black text-xl">{Userdata.name}</p>
          <p>{Userdata.email}</p>
        </div>
        <img
          src={avatar}
          className=" bg-white flex-2 rounded-full overflow-hidden h-20"
        />
      </div>
      <div className=" flex-1 flex flex-col  items-center rounded-xl justify-between bg-gray-100 w-full">
        <div className=" flex items-center space-x-2 p-3  bg-gray-800 w-full text-white  rounded-t-md justify-center">
          <RiShoppingBag3Fill className=" size-5" />
          <p className=" font-semibold">Your Cart</p>
        </div>
        <Lottie animationData={Garbagecan} loop={true} className="  h-72" />
        <div className=" w-full p-2">
          <button className=" w-full bg-black text-white p-2  rounded-xl font-semibold text-center">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
