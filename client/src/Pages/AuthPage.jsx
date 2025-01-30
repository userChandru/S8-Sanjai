import React from "react";
import logo from "../assets/img/logo.png";
import AuthenticationButton from "../Components/AuthenticationButton";
import { SiAuthelia } from "react-icons/si";
import { FaGoogle } from "react-icons/fa6";
import { FaArrowCircleRight } from "react-icons/fa";
import { SiGoogleadsense } from "react-icons/si";
const AuthPage = () => {
  return (
    <div className=" bg-slate-100  flex items-center justify-center ">
      <div className=" bg-white    rounded-2xl w-1/2  p-20 space-y-5 flex flex-col items-center justify-center ">
        <SiGoogleadsense className=" text-indigo-600 size-40" />
        <p className=" text-black  pb-10 pt-5  text-4xl font-semibold leading-tight text-center ">
          Startup Ecosystem Dashboard for Student Entrepreneurs
        </p>
        <div className=" w-full  px-20 space-y-3">
          <AuthenticationButton
            name={"Student Authentication "}
            icon={<FaGoogle className=" size-6" />}
            iconr={<FaArrowCircleRight className=" size-6" />}
          />
          <AuthenticationButton
            name={" Admin Authetication"}
            icon={<SiAuthelia className=" size-6" />}
            iconr={<FaArrowCircleRight className=" size-6" />}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
