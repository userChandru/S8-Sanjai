import React from "react";
// import Productdata from "../data/Productdata";
import Productdata from "../data2/Productdata";
import avatar from "../assets/img/avatar.png";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FaShopify } from "react-icons/fa";

import { TbCurrencyRupee } from "react-icons/tb";
import { HiPercentBadge } from "react-icons/hi2";
import { MdInventory } from "react-icons/md";

const Product = () => {
  return (
    <div>
      <div className=" mb-10 overflow-hidden relative bg-gray-100 w-full h-60">
        <div className=" space-y-2 text-6xl font-bold absolute top-10 left-5 text-gray-600">
          <p>Company Name</p>
        </div>

        <FaShopify className=" text-gray-600 -bottom-10 right-20 absolute size-60 " />
      </div>
      <div className=" py-10 grid grid-cols-3 px-10 gap-10">
        {Productdata &&
          Productdata.map((pro) => (
            <div className="relative bg-gray-100 p-2 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white">
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
              <div className=" rounded-xl flex items-center justify-center space-x-4 text-white p-2 text-center bg-black">
                <p className=" font-semibold">Add to cart</p>
                <RiShoppingBag3Fill className=" size-5" />
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

export default Product;
