import React from "react";
import { FaShop } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { HiPercentBadge } from "react-icons/hi2";
import { TbCurrencyRupee } from "react-icons/tb";
import avatar from "../../assets/img/avatar.png";

const AdminBank = () => {
  // Placeholder data - similar to Profile page
  const placeholderProducts = [
    {
      name: "Tomatoes",
      price: 70,
      originalPrice: 90,
      stock: 20,
      discount: 20,
      image: "https://images.unsplash.com/photo-1546750670-50d46a5ad447"
    },
    {
      name: "Onions",
      price: 50,
      originalPrice: 70,
      stock: 20,
      discount: 20,
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb"
    },
    {
      name: "Cucumbers",
      price: 60,
      originalPrice: 80,
      stock: 20,
      discount: 20,
      image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e"
    },
    {
      name: "Bananas",
      price: 40,
      originalPrice: 60,
      stock: 20,
      discount: 20,
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224"
    },
    {
      name: "Apples",
      price: 55,
      originalPrice: 75,
      stock: 20,
      discount: 20,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6"
    },
    {
      name: "Oranges",
      price: 65,
      originalPrice: 85,
      stock: 20,
      discount: 20,
      image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9"
    },
    {
      name: "Milk",
      price: 30,
      originalPrice: 50,
      stock: 20,
      discount: 20
    },
    {
      name: "Eggs",
      price: 25,
      originalPrice: 45,
      stock: 20,
      discount: 20
    },
    {
      name: "Bread",
      price: 20,
      originalPrice: 40,
      stock: 20,
      discount: 20
    }
  ];

  return (
    <div>
      <div className="overflow-hidden relative bg-gray-100 w-full h-60">
        <div className="space-y-2 text-6xl font-bold absolute top-10 left-5 text-gray-600">
          <p>Rootz Prvt Limited</p>
          <p className="text-gray-400 text-4xl font-semibold">
            Grocery Sector
          </p>
        </div>
        <FaShop className="text-gray-600 -bottom-10 right-20 absolute size-60" />
      </div>

      <div className="my-5 flex items-center justify-center bg-gray-100 *:p-2 space-x-4 *:rounded-xl *:px-3">
        {/* Additional filters or options can be added here */}
      </div>

      <div className="pb-10 grid grid-cols-3 px-10 gap-10">
        {placeholderProducts.map((product, index) => (
          <div key={index} className="relative bg-gray-100 p-2 rounded-xl">
            <div 
              className="h-40 bg-white rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${product.image})` }}
            ></div>
            <div className="my-2 text-xl items-center flex justify-between">
              <p className="font-semibold">{product.name}</p>
              <p className="flex items-center justify-center mr-3 font-semibold">
                <TbCurrencyRupee className="text-green-600 size-6" />
                <span className="text-green-600">{product.price}</span>
                <span className="text-sm ml-1 decoration-2 mt-1 line-through">
                  {product.originalPrice}
                </span>
              </p>
            </div>
            <div className="space-x-2 my-2 flex w-full items-center">
              <p className="flex-1 flex items-center justify-center space-x-2 text-pink-600 bg-pink-100 px-2 p-1 rounded-xl text-sm font-semibold">
                <MdInventory />
                <span>{product.stock} Stock left</span>
              </p>
              <p className="flex-1 flex items-center justify-center space-x-2 text-sky-600 bg-sky-100 px-2 p-1 rounded-xl text-sm font-semibold">
                <HiPercentBadge className="size-5" />
                <span>{product.discount}% Offer</span>
              </p>
            </div>
            <div className="rounded-xl flex items-center justify-center space-x-4 text-white p-2 text-center bg-gray-800">
              <button className="font-semibold flex items-center space-x-2">
                <span>Edit</span>
                <FaEdit className="size-5" />
              </button>
            </div>
            <div className="absolute top-4 right-4 flex items-center space-x-3">
              <div className="flex">
                <img
                  src={avatar}
                  className="rounded-full overflow-hidden h-10 bg-white"
                  alt="User avatar"
                />
                <img
                  src={avatar}
                  className="rounded-full overflow-hidden h-10 -ml-2 z-10 bg-white"
                  alt="User avatar"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBank; 