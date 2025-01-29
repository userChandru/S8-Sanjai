import React from "react";

const AuthenticationButton = ({ name, type, isSubmitting, icon, iconr }) => {
  return (
    <button
      type={type}
      disabled={isSubmitting}
      className="w-full text-lg flex items-center font-semibold justify-between   cursor-pointer rounded-2xl bg-indigo-600 p-3 px-10  text-white  transition-all duration-200 ease-in-out hover:scale-[0.99]"
    >
      <div className=" flex items-center justify-center space-x-2">
        <div>{icon && icon}</div>
        <p>{isSubmitting ? "loading" : name}</p>
      </div>
      <div>{iconr && iconr}</div>
    </button>
  );
};

export default AuthenticationButton;
