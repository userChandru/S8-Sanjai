import React from "react";

const ButtonComponent = ({ name, type , isSubmitting  }) => {
  return (
    <button
      type={type}
      disabled={isSubmitting}
      className="w-full  text-xl cursor-pointer rounded-2xl bg-indigo-600 p-3 px-10 font-semibold text-white  transition-all duration-200 ease-in-out hover:scale-[0.95]"
    >
      {isSubmitting ? "loading" : name}
    </button>
  );
};

export default ButtonComponent;
