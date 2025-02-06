import React, { useState, useEffect } from "react";
import avatar from "../assets/img/Avatar.png";
// import Userdata from "../data/Userdata";
import Userdata from "../data2/Userdata";
import { RiShoppingBag3Fill } from "react-icons/ri";
import Lottie from "lottie-react";
import Garbagecan from "../assets/Animation/garbage.json"

const Sidebar = () => {
  const [time, setTime] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      const hours = istTime.getUTCHours().toString().padStart(2, '0');
      const minutes = istTime.getUTCMinutes().toString().padStart(2, '0');
      const seconds = istTime.getUTCSeconds();
      const milliseconds = istTime.getUTCMilliseconds();
      
      // Calculate progress with millisecond precision for smooth animation
      const smoothProgress = ((seconds * 1000 + milliseconds) / (60 * 1000)) * 100;
      
      setTime(`${hours}:${minutes}`);
      setProgress(smoothProgress);
    };

    // Update more frequently for smoother animation
    const interval = setInterval(updateTime, 16); // approximately 60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full h-full p-2 space-y-2 bg-white rounded-xl">
      <div className="relative p-1">
        {/* Circular progress background */}
        <div 
          className="absolute inset-0 rounded-xl border border-[#edeeee]"
          style={{
            background: `conic-gradient(from 0deg, #313323 ${progress}%, transparent ${progress}%)`,
            maskImage: 'radial-gradient(transparent 65%, black 66%)',
            WebkitMaskImage: 'radial-gradient(transparent 65%, black 66%)',
          }}
        />
        
        {/* Time content */}
        <div className="relative flex flex-col items-center justify-center p-3 rounded-xl bg-gray-100" id="time">
          <p className="text-2xl font-semibold">Trade Zone Duration</p>
          <p className="font-bold text-8xl font-mono tracking-wider">{time}</p>
        </div>
      </div>
      <div className="flex items-center p-3 rounded-xl bg-gray-100 space-x-5 justify-between">
        <div className="text-slate-700 flex-1 flex flex-col items-start justify-end font-semibold text-right">
          <p className="text-black text-xl">{Userdata.name}</p>
          <p>{Userdata.email}</p>
        </div>
        <img
          src={avatar}
          alt="User avatar"
          className="bg-white flex-2 rounded-full overflow-hidden h-20"
        />
      </div>
      <div className="flex-1 flex flex-col items-center rounded-xl justify-between bg-gray-100 w-full">
        <div className="flex items-center space-x-2 p-3 bg-gray-800 w-full text-white rounded-t-md justify-center">
          <RiShoppingBag3Fill className="size-5" />
          <p className="font-semibold">Your Cart</p>
        </div>
        <Lottie animationData={Garbagecan} loop={true} className="h-72" />
        <div className="w-full p-2">
          <button className="w-full bg-black text-white p-2 rounded-xl font-semibold text-center">
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
