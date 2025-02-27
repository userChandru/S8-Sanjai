import { useState, useEffect } from 'react';
import { BiSolidBank } from "react-icons/bi";
import { MdInventory } from "react-icons/md";
import { HiPercentBadge } from "react-icons/hi2";
import { TbCurrencyRupee } from "react-icons/tb";
import { RiShoppingBag3Fill } from "react-icons/ri";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const Bank = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const bankBusinessId = '67c02301840e144cc3b07fdc'; // Bank's business ID

  useEffect(() => {
    const fetchBankProducts = async () => {
      try {
        setLoading(true);
        const api = axios.create({
          baseURL: 'http://localhost:5000/api',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 67c022db840e144cc3b07fd9'
          }
        });

        const response = await api.get(`/inventories/${bankBusinessId}`, {
          params: { skipAuth: true }
        });

        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching bank products:', error);
        setError(error.response?.data?.message || 'Failed to load bank products');
        toast.error('Failed to load bank products');
      } finally {
        setLoading(false);
      }
    };

    fetchBankProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cartItem = {
      name: product.product.product_name,
      price: product.price,
      image: product.product.product_image,
      quantity: 1,
      stock: product.quantity,
      businessId: bankBusinessId
    };

    addToCart(cartItem);
    toast.success(`Added ${product.product.product_name} to cart!`, {
      icon: '🛒',
      style: {
        background: '#10B981',
        color: 'white',
      },
    });
  };

  return (
    <div>
      <div className="overflow-hidden relative bg-gray-100 w-full h-60">
        <div className="space-y-2 text-6xl font-bold absolute top-10 left-5 text-gray-600">
          <p>Trade Zone Bank</p>
          <p className="text-gray-400 text-4xl font-semibold">
            Banking Sector
          </p>
        </div>
        <BiSolidBank className="text-gray-600 -bottom-24 right-20 absolute size-80" />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading bank products...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64 text-red-500">
          <p>{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p>No products available in bank</p>
        </div>
      ) : (
        <div className="px-10 py-8">
          <div className="grid grid-cols-3 gap-5">
            {products.map((product) => (
              <div 
                key={product.product._id} 
                className="relative bg-gray-100 p-2 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:bg-white"
              >
                {/* Image Section */}
                <div 
                  className="bg-white h-32 w-full rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${product.product.product_image})` }}
                />

                {/* Product Info Section */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="mt-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{product.product.product_name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.product.product_description}
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
                        <span>{product.offer}% Offer</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="rounded-xl flex items-center justify-center space-x-4 text-white p-2 text-center bg-black">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="font-semibold flex items-center space-x-2"
                    disabled={product.quantity === 0}
                  >
                    <span>{product.quantity === 0 ? 'Out of Stock' : 'Add to cart'}</span>
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

export default Bank;