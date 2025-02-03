import React from "react";
import logo from "../assets/img/logo.png";
import AuthenticationButton from "../Components/AuthenticationButton";
import { SiAuthelia } from "react-icons/si";
import { FaGoogle } from "react-icons/fa6";
import { FaArrowCircleRight } from "react-icons/fa";
import { SiGoogleadsense } from "react-icons/si";

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center p-4">
      <div className="bg-[#e0e5ec] rounded-2xl w-full max-w-2xl p-8 md:p-12 
        shadow-[20px_20px_60px_#bec3c9,-20px_-20px_60px_#ffffff]">
        
        {/* Logo Container */}
        <div className="flex justify-center mb-8">
          <div className="p-6 rounded-full 
            shadow-[8px_8px_16px_#bec3c9,-8px_-8px_16px_#ffffff]">
            <SiGoogleadsense className="text-indigo-600 size-20" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-gray-800 pb-8 text-3xl md:text-4xl font-semibold leading-tight text-center">
          Startup Ecosystem Dashboard for Student Entrepreneurs
        </h1>

        {/* Buttons Container */}
        <div className="space-y-4 px-4 md:px-12">
          {/* Student Authentication Button */}
          <div className="transform transition-all duration-200 hover:scale-[1.02]">
            <AuthenticationButton
              name="Student Authentication"
              icon={
                <div className="bg-white p-2 rounded-3xl">
                  <FaGoogle className="size-5 text-indigo-600" />
                </div>
              }
              iconr={
                <div className="bg-white p-2 rounded-lg">
                  <FaArrowCircleRight className="size-5 text-indigo-600" />
                </div>
              }
            />
          </div>

          {/* Admin Authentication Button */}
          <div className="transform transition-all duration-200 hover:scale-[1.02]">
            <AuthenticationButton
              name="Admin Authentication"
              icon={
                <div className="bg-white p-2 rounded-3xl">
                  <SiAuthelia className="size-5 text-indigo-600" />
                </div>
              }
              iconr={
                <div className="bg-white p-2 rounded-lg">
                  <FaArrowCircleRight className="size-5 text-indigo-600" />
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
