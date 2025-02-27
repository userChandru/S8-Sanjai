import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <span className="text-gray-600">{cartItems.length} items</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-24 h-24 mb-4 text-gray-400">
            {/* Shopping bag icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Qty: {item.quantity}</span>
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Total</span>
              <span className="font-semibold">
                ₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}
              </span>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Purchase ({cartItems.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 