import { useState, useEffect } from "react";
import { RiAdminFill } from "react-icons/ri";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import Lottie from "lottie-react";
import Garbagecan from "../../assets/Animation/garbage.json";

const AdminSidebar = () => {
  const [time, setTime] = useState("");
  const [progress, setProgress] = useState(0);
  const adminData = {
    name: "Admin Panel",
    email: "admin@tradezone.com"
  };

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      const hours = istTime.getUTCHours().toString().padStart(2, '0');
      const minutes = istTime.getUTCMinutes().toString().padStart(2, '0');
      const seconds = istTime.getUTCSeconds();
      const milliseconds = istTime.getUTCMilliseconds();
      
      const smoothProgress = ((seconds * 1000 + milliseconds) / (60 * 1000)) * 100;
      
      setTime(`${hours}:${minutes}`);
      setProgress(smoothProgress);
    };

    const interval = setInterval(updateTime, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-[400px] h-full p-2 space-y-2 bg-white rounded-xl">
      {/* Time Section with Border Animation */}
      <div className="relative p-1">
        <div 
          className="absolute inset-0 rounded-xl border border-[#edeeee]"
          style={{
            background: `conic-gradient(from 0deg, #4F46E5 ${progress}%, transparent ${progress}%)`,
            maskImage: 'radial-gradient(transparent 65%, black 66%)',
            WebkitMaskImage: 'radial-gradient(transparent 65%, black 66%)',
          }}
        />
        <div className="relative flex flex-col items-center justify-center p-3 rounded-xl bg-gray-100">
          <p className="text-2xl font-semibold">Trade Zone Duration</p>
          <p className="font-bold text-8xl font-mono tracking-wider">{time}</p>
        </div>
      </div>

      {/* Admin Info Section */}
      <div className="flex items-center p-3 rounded-xl bg-gray-100 space-x-5">
        <div className="text-slate-700 flex-1 flex flex-col items-start justify-end font-semibold">
          <p className="text-black text-xl">{adminData.name}</p>
          <p className="text-gray-600">{adminData.email}</p>
        </div>
        <div className="h-20 w-20 rounded-full overflow-hidden bg-indigo-100 flex items-center justify-center">
          <RiAdminFill className="size-12 text-indigo-600" />
        </div>
      </div>

      {/* Activity Section */}
      <div className="flex-1 flex flex-col items-center rounded-xl justify-between bg-gray-100 w-full">
        <div className="flex items-center space-x-2 p-3 bg-gray-800 w-full text-white rounded-t-md justify-center">
          <HiOutlineClipboardDocumentList className="size-5" />
          <p className="font-semibold">Admin Records</p>
        </div>
        <Lottie animationData={Garbagecan} loop={true} className="h-72" />
        <div className="w-full p-2">
          <button className="w-full bg-black text-white p-2 rounded-xl font-semibold text-center">
            View Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar; 