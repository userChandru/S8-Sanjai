import React from "react";
import Database from "../data/Database";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { MdInventory } from "react-icons/md";
import { HiPercentBadge } from "react-icons/hi2";
import avatar from "../assets/img/avatar.png";
import { Link } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";


const Marketplace = () => {
  return (
    <div>
      <div className=" mb-10 overflow-hidden relative bg-gray-100 w-full h-60">
        <div className=" space-y-2 text-6xl font-bold absolute top-10 left-5 text-gray-600">
          <p>Trade Zone</p>
        </div>

        <GiTakeMyMoney className=" text-gray-600 -bottom-10 right-20 absolute size-60 " />
      </div>
      <div className=" pb-10 grid grid-cols-3 gap-5 px-10">
        {Database &&
          Database?.map((user, index) => (
            <Link
              to={`/name`}
              className=" bg-gray-100 rounded-xl  p-2"
              key={index}
            >
              <div className="  bg-white h-40 w-full rounded-xl"></div>
              <div className=" flex items-center justify-between  mt-2">
                <div>
                  <h2 className=" text-xl font-semibold ">
                    {user.bussinessName}
                  </h2>
                  <p className=" text-sm font-semibold text-gray-500">
                    {user.businessSector}
                  </p>
                </div>
                <div className="  text-green-600 px-3 rounded-md bg-green-100 p-1">
                  <HiMiniArrowTrendingUp className="  size-7 text-green-600" />
                  <p className=" font-semibold">250</p>
                </div>
              </div>
              <div className=" space-x-2 my-2 flex w-full items-center">
                <p className=" flex-1 flex items-center justify-center  space-x-2  text-sky-600 bg-sky-100 px-2 p-1 rounded-xl text-sm font-semibold">
                  <HiPercentBadge className=" size-5" />
                  <span>20% Offer</span>
                </p>
                <p className=" flex-1 flex items-center  justify-center  space-x-2 text-pink-600 bg-pink-100 px-2 p-1 rounded-xl text-sm font-semibold">
                  <MdInventory />
                  <span>20 Stock left</span>
                </p>
              </div>
              <div className=" flex items-center space-x-3">
                <div className=" flex ">
                  <img
                    src={avatar}
                    className=" rounded-full overflow-hidden   border-2 border-black h-10 bg-white"
                  />
                  <img
                    src={avatar}
                    className=" rounded-full overflow-hidden  border-2 border-black h-10 -ml-2 z-10 bg-white"
                  />
                </div>
                <div>
                  <p className=" font-semibold">JK Flowers</p>
                  <p className=" font-semibold text-gray-500 text-sm">
                    Collabrative Partner
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Marketplace;
