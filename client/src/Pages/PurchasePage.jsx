import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { TbCurrencyRupee } from "react-icons/tb";
import toast from 'react-hot-toast';

const PurchasePage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePurchase = () => {
    toast.success('Purchase successful!');
    clearCart();
    navigate('/marketplace'); // or wherever you want to redirect after purchase
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {/* Items List */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center space-x-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-16 h-16 object-cover rounded"
              />
              <span className="font-medium">{item.name}</span>
            </div>
            <div className="flex items-center text-green-600">
              <TbCurrencyRupee className="size-4" />
              <span>{item.price}</span>
            </div>
          </div>
        ))}
        
        {/* Total */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t">
          <span className="text-xl font-semibold">Total</span>
          <div className="flex items-center text-2xl font-bold text-green-600">
            <TbCurrencyRupee className="size-6" />
            <span>{total}</span>
          </div>
        </div>
      </div>

      {/* Purchase Button */}
      <button
        onClick={handlePurchase}
        className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-700"
      >
        Pay and Buy
      </button>
    </div>
  );
};

export default PurchasePage; 