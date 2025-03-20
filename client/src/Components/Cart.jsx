import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const businessId = '67bc311c3d7caf05bb345cfd'; // Your business ID
  const userId = '67bc31183d7caf05bb345ca4'; // Your user ID for auth token

  // Create API instance with auth token
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userId}`
    }
  });

  const handlePurchase = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      console.log('Starting purchase process for items:', cartItems);
      
      // Process each item in cart
      for (const item of cartItems) {
        console.log('Adding to inventory:', item);
        
        try {
          // Add product to your business inventory with for_sale=false
          const response = await api.post(`/inventories/${businessId}/products`, {
            productId: item.productId,
            price: item.price,
            quantity: item.quantity || 1,
            bought_price: item.price,
            for_sale: false,
            skipAuth: 'true'
          });
          
          console.log('Added to inventory response:', response.data);
        } catch (itemError) {
          console.error('Error adding item to inventory:', itemError);
          
          // Check if error is because product already exists
          if (itemError.response?.data?.message?.includes('already in inventory')) {
            // Try updating quantity instead
            try {
              const inventoryResponse = await api.get(`/inventories/${businessId}`, {
                params: { skipAuth: 'true' }
              });
              
              const existingProduct = inventoryResponse.data.products.find(
                p => p.product._id === item.productId
              );
              
              if (existingProduct) {
                // Update quantity of existing product
                await api.patch(
                  `/inventories/${businessId}/products/${item.productId}/quantity`,
                  {
                    quantity: existingProduct.quantity + (item.quantity || 1),
                    skipAuth: 'true'
                  }
                );
                
                console.log('Updated quantity of existing product');
              }
            } catch (updateError) {
              console.error('Error updating existing product:', updateError);
              throw updateError;
            }
          } else {
            throw itemError;
          }
        }
      }
      
      // Clear the cart after successful purchase
      clearCart();
      
      toast.success('Purchase successful! Items added to your inventory.', {
        icon: '🛍️',
        style: {
          background: '#10B981',
          color: 'white',
        },
      });
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(error.response?.data?.message || 'Failed to complete purchase');
    } finally {
      setLoading(false);
    }
  };

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
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
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
            <button 
              className={`w-full mt-4 ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded-lg`}
              onClick={handlePurchase}
              disabled={loading}
            >
              {loading ? 'Processing...' : `Purchase (${cartItems.length})`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 