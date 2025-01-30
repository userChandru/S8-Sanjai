import React from "react";
import { FaShop } from "react-icons/fa6";
import Userdata from "../data/Userdata";
import avatar from "../assets/img/avatar.png";
import { MdEdit, MdInventory } from "react-icons/md";
import { HiPercentBadge } from "react-icons/hi2";
import { TbCurrencyRupee } from "react-icons/tb";
import Productdata from "../data/Productdata";
const Profile = () => {
  return (
    <div>
      <div className=" overflow-hidden relative bg-gray-100 w-full h-60">
        <div className=" space-y-2 text-6xl font-bold absolute top-10 left-5 text-gray-600">
          <p>{Userdata.bussinessName}</p>
          <p className="  text-gray-400 text-4xl font-semibold">
            {Userdata.businessSector} Sector
          </p>
        </div>

        <FaShop className=" text-gray-600 -bottom-10 right-20 absolute size-60 " />
      </div>
      <div className=" my-5 flex items-center justify-center bg-gray-100  *:p-2 space-x-4 *:rounded-xl *:px-3">
        {/* <p>Purchased</p>
        <p>Sold</p> */}{" "}
      </div>
      <div className=" pb-10 grid grid-cols-3 px-10 gap-10">
        {Productdata &&
          Productdata.map((pro) => (
            <div className=" relative bg-gray-100 p-2 rounded-xl">
              <div className="  h-40 bg-white rounded-xl"></div>
              <div className=" my-2  text-xl items-center flex justify-between">
                <p className="  font-semibold">{pro.name}</p>
                <p className=" flex items-center  justify-center  mr-3 font-semibold">
                  <TbCurrencyRupee className=" text-green-600 size-6" />
                  <span className=" text-green-600">{pro.price}</span>
                  <span className=" text-sm ml-1 decoration-2  mt-1 line-through">
                    {pro.price + 20}
                  </span>
                </p>
              </div>
              <div className=" space-x-2 my-2 flex w-full items-center">
                <p className=" flex-1 flex items-center  justify-center  space-x-2 text-pink-600 bg-pink-100 px-2 p-1 rounded-xl text-sm font-semibold">
                  <MdInventory />
                  <span>20 Stock left</span>
                </p>
                <p className=" flex-1 flex items-center justify-center  space-x-2  text-sky-600 bg-sky-100 px-2 p-1 rounded-xl text-sm font-semibold">
                  <HiPercentBadge className=" size-5" />
                  <span>20% Offer</span>
                </p>
              </div>
              <div className=" rounded-xl flex items-center justify-center space-x-4 text-white p-2 text-center bg-gray-800">
                <p className=" font-semibold">Edit</p>
                <MdEdit className=" size-5" />
              </div>
              <div className=" absolute top-4 right-4 flex items-center space-x-3">
                <div className="  flex ">
                  <img
                    src={avatar}
                    className=" rounded-full overflow-hidden  h-10 bg-white"
                  />
                  <img
                    src={avatar}
                    className=" rounded-full overflow-hidden h-10 -ml-2 z-10 bg-white"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
