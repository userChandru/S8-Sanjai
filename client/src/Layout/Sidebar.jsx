import React, { useState, useEffect } from "react";
import avatar from "../assets/img/Avatar.png";
// import Userdata from "../data/Userdata";
import Userdata from "../data2/Userdata";
import { useCart } from "../context/CartContext";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { TbCurrencyRupee } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import Lottie from "lottie-react";
import Garbagecan from "../assets/Animation/garbage.json"
import toast from 'react-hot-toast';

const Sidebar = () => {
  const [time, setTime] = useState("");
  const [progress, setProgress] = useState(0);
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [currentUser] = useState(Userdata[0]); // Get the first user from the array

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      const hours = istTime.getUTCHours().toString().padStart(2, '0');
      const minutes = istTime.getUTCMinutes().toString().padStart(2, '0');
      const seconds = istTime.getUTCSeconds();
      const milliseconds = istTime.getUTCMilliseconds();
      
      // Calculate progress with millisecond precision for smooth animation
      const smoothProgress = ((seconds * 1000 + milliseconds) / (60 * 1000)) * 100;
      
      setTime(`${hours}:${minutes}`);
      setProgress(smoothProgress);
    };

    // Update more frequently for smoother animation
    const interval = setInterval(updateTime, 16); // approximately 60fps

    return () => clearInterval(interval);
  }, []);

  const handlePurchase = async () => {
    const loadingToast = toast.loading('Processing purchase...');
    
    try {
      const response = await fetch('http://localhost:5000/api/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });
      
      if (response.ok) {
        clearCart();
        toast.success('Purchase successful!', {
          id: loadingToast,
          icon: '🛍️',
        });
      } else {
        throw new Error('Purchase failed');
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      toast.error('Purchase failed. Please try again.', {
        id: loadingToast,
        icon: '❌',
      });
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-2 space-y-2 bg-white rounded-xl">
      <div className="relative p-1">
        {/* Circular progress background */}
        <div 
          className="absolute inset-0 rounded-xl border border-[#edeeee]"
          style={{
            background: `conic-gradient(from 0deg, #313323 ${progress}%, transparent ${progress}%)`,
            maskImage: 'radial-gradient(transparent 65%, black 66%)',
            WebkitMaskImage: 'radial-gradient(transparent 65%, black 66%)',
          }}
        />
        
        {/* Time content */}
        <div className="relative flex flex-col items-center justify-center p-3 rounded-xl bg-gray-100" id="time">
          <p className="text-2xl font-semibold">Trade Zone Duration</p>
          <p className="font-bold text-8xl font-mono tracking-wider">{time}</p>
        </div>
      </div>
      <div className="flex items-center p-3 rounded-xl bg-gray-100 space-x-5">
        <div className="text-slate-700 flex-1 flex flex-col items-start justify-end font-semibold">
          <p className="text-black text-xl">{currentUser?.name}</p>
          <p className="text-gray-600">{currentUser?.email}</p>
        </div>
        <img
          src={currentUser?.image || avatar}
          alt="User avatar"
          className="h-20 rounded-full overflow-hidden bg-white"
        />
      </div>
      <div className="flex-1 flex flex-col items-center rounded-xl justify-between bg-gray-100 w-full">
        <div className="flex items-center space-x-2 p-3 bg-gray-800 w-full text-white rounded-t-md justify-center">
          <RiShoppingBag3Fill className="size-5" />
          <p className="font-semibold">Your Cart</p>
        </div>
        
        {cartItems.length === 0 ? (
          <Lottie animationData={Garbagecan} loop={true} className="h-72" />
        ) : (
          <div className="w-full flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {cartItems.map((item, index) => (
              <div key={index} className="p-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="h-12 w-12 bg-cover bg-center rounded-lg"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <div className="flex items-center text-green-600">
                        <TbCurrencyRupee className="size-4" />
                        <span>{item.price}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <MdDelete className="size-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="w-full p-2">
          <button 
            onClick={handlePurchase}
            disabled={cartItems.length === 0}
            className={`w-full p-2 rounded-xl font-semibold text-center ${
              cartItems.length === 0 
                ? 'bg-gray-400 text-gray-200' 
                : 'bg-black text-white'
            }`}
          >
            Purchase ({cartItems.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
