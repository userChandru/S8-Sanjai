import React, { useState } from "react";
// import Database from "../data/Database";
import Database from "../data2/Database";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { MdInventory } from "react-icons/md";
import { HiPercentBadge } from "react-icons/hi2";
import avatar from "../assets/img/avatar.png";
import { Link } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbCurrencyRupee } from "react-icons/tb";
import { useCart } from '../context/CartContext';
import { RiShoppingBag3Fill } from "react-icons/ri";
import toast from 'react-hot-toast';

const Marketplace = () => {
  const [selectedMarket, setSelectedMarket] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`Added ${product.name} to cart!`, {
      icon: '🛒',
      style: {
        background: '#10B981',
        color: 'white',
      },
    });
  };

  return (
    <div>
      <div className=" mb-10 overflow-hidden relative bg-gray-100 w-full h-60">
        <div className=" space-y-2 text-6xl font-bold absolute top-10 left-5 text-gray-600">
          <p>Trade Zone</p>
        </div>

        <GiTakeMyMoney className=" text-gray-600 -bottom-10 right-20 absolute size-60 " />
      </div>

      {/* Markets Grid */}
      {!selectedMarket ? (
        <div className=" pb-10 grid grid-cols-3 gap-5 px-10">
          {Database &&
            Database?.map((market, index) => (
              <div
                onClick={() => setSelectedMarket(market)}
                className=" cursor-pointer bg-gray-100 rounded-xl p-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white"
                key={index}
              >
                <div
                  className="bg-white h-40 w-full rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${market.marketImage})` }}
                ></div>
                <div className=" flex items-center justify-between  mt-2">
                  <div>
                    <h2 className=" text-xl font-semibold ">
                      {market.bussinessName}
                    </h2>
                    <p className=" text-sm font-semibold text-gray-500">
                      {market.businessSector}
                    </p>
                  </div>
                  <div className="  text-green-600 px-3 rounded-md bg-green-100 p-1">
                    <HiMiniArrowTrendingUp className="  size-7 text-green-600" />
                    <p className=" font-semibold">250</p>
                  </div>
                </div>
                {/* <div className=" space-x-2 my-2 flex w-full items-center">
                  <p className=" flex-1 flex items-center justify-center  space-x-2  text-sky-600 bg-sky-100 px-2 p-1 rounded-xl text-sm font-semibold">
                    <HiPercentBadge className=" size-5" />
                    <span>20% Offer</span>
                  </p>
                  <p className=" flex-1 flex items-center  justify-center  space-x-2 text-pink-600 bg-pink-100 px-2 p-1 rounded-xl text-sm font-semibold">
                    <MdInventory />
                    <span>20 Stock left</span>
                  </p>
                </div> */}
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
              </div>
            ))}
        </div>
      ) : (
        // Products Grid for Selected Market
        <div className="px-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold">
              {selectedMarket.bussinessName}
            </h2>
            <button
              onClick={() => setSelectedMarket(null)}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Back to Markets
            </button>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {selectedMarket.products.map((product, index) => (
              <div 
                key={index} 
                className="relative bg-gray-100 p-2 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white"
              >
                {/* Image Section - Reduced height */}
                <div 
                  className="bg-white h-32 w-full rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>

                {/* Product Info Section */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Title and Price */}
                  <div className="mt-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <TbCurrencyRupee className="text-green-600 size-4" />
                        <span className="text-green-600 font-bold">
                          {product.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stock and Discount */}
                  <div className="mb-2 pt-2 mt-2">
                    <div className="flex space-x-2">
                      <p className="flex-1 flex items-center justify-center space-x-1 text-pink-600 bg-pink-100 px-2 py-1 rounded-lg text-xs font-semibold">
                        <MdInventory className="size-3" />
                        <span>{product.quantity} Stock left</span>
                      </p>
                      <p className="flex-1 flex items-center justify-center space-x-1 text-sky-600 bg-sky-100 px-2 py-1 rounded-lg text-xs font-semibold">
                        <HiPercentBadge className="size-3" />
                        <span>20% Offer</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl flex items-center justify-center space-x-4 text-white p-2 text-center bg-black">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="font-semibold flex items-center space-x-2"
                  >
                    <span>Add to cart</span>
                    <RiShoppingBag3Fill className="size-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
