/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import { FaShop } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import avatar from "../assets/img/avatar.png";
import { MdInventory } from "react-icons/md";
import { HiPercentBadge } from "react-icons/hi2";
import { TbCurrencyRupee } from "react-icons/tb";
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForSaleModal, setShowForSaleModal] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [businessSector, setBusinessSector] = useState('');
  const businessId = '67bc311c3d7caf05bb345cfd';

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 67bc31183d7caf05bb345ca4'
    }
  });

  useEffect(() => {
    const fetchBusinessAndInventory = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get business details
        const businessResponse = await api.get(`/businesses/${businessId}`, {
          params: { skipAuth: 'true' }
        });
        
        setBusinessName(businessResponse.data.business_name);
        setBusinessSector(businessResponse.data.business_sector);

        // Get inventory
        const inventoryResponse = await api.get(`/inventories/${businessId}`, {
          params: { skipAuth: 'true' }
        });

        console.log('Inventory response:', inventoryResponse.data);
        // Only show products that are for_sale in the main view
        setProducts(inventoryResponse.data.products.filter(p => p.for_sale) || []);
        // Store all products for the modal
        setAllProducts(inventoryResponse.data.products || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.message || error.message);
        toast.error('Failed to load business data');
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessAndInventory();
  }, [businessId]);

  const handleUpdateProduct = async (productId, updates) => {
    try {
      console.log('Updating product:', { productId, updates });

      // Update product
      const updateResponse = await api.patch(
        `/inventories/${businessId}/products/${productId}/price`, 
        {
          price: updates.price,
          skipAuth: 'true'
        }
      );
      console.log('Price update response:', updateResponse.data);

      // Update quantity
      await api.patch(
        `/inventories/${businessId}/products/${productId}/quantity`,
        {
          quantity: updates.quantity,
          skipAuth: 'true'
        }
      );

      // Update offer
      await api.patch(
        `/inventories/${businessId}/products/${productId}/offer`,
        {
          offer: updates.offer,
          skipAuth: 'true'
        }
      );
      
      // Refresh products
      const response = await api.get(`/inventories/${businessId}`, {
        params: { skipAuth: 'true' }
      });
      setProducts(response.data.products || []);
      
      toast.success('Product updated successfully');
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.response?.data?.message || 'Failed to update product');
    }
  };

  const handleEdit = (item) => {
    setEditingProduct({
      product: item.product,
      price: item.price,
      quantity: item.quantity,
      offer: item.offer || 0,
      for_sale: item.for_sale || true
    });
  };

  const handleToggleForSale = async (productId, currentStatus) => {
    try {
      await api.patch(
        `/inventories/${businessId}/products/${productId}/toggle-sale`,
        { skipAuth: 'true' }
      );

      // Update local state
      const updatedAllProducts = allProducts.map(product => {
        if (product.product._id === productId) {
          return { ...product, for_sale: !currentStatus };
        }
        return product;
      });
      setAllProducts(updatedAllProducts);
      
      // Update products shown in main view
      setProducts(updatedAllProducts.filter(p => p.for_sale));
      
      toast.success('Product visibility updated successfully');
    } catch (error) {
      console.error('Error toggling product sale status:', error);
      toast.error('Failed to update product visibility');
    }
  };

  return (
    <div>
      <div className=" overflow-hidden relative bg-gray-100 w-full h-60">
        <div className=" space-y-2 text-6xl font-bold absolute top-10 left-5 text-gray-600">
          <p>{businessName}</p>
          <p className="  text-gray-400 text-4xl font-semibold">
            {businessSector} Sector
          </p>
        </div>
        <FaShop className=" text-gray-600 -bottom-10 right-20 absolute size-60 " />
      </div>
      <div className="my-5 flex items-center justify-center bg-gray-100 *:p-2 space-x-4 *:rounded-xl *:px-3">
        <button
          onClick={() => setShowForSaleModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2"
        >
          <span>Manage For Sale Items</span>
          <FaShop className="size-5" />
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading inventory...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64 text-red-500">
          <p>{error}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p>No products found in inventory</p>
        </div>
      ) : (
        <div className=" pb-10 grid grid-cols-3 px-10 gap-10">
          {products.map((item) => (
            <div key={item.product._id} className="relative bg-gray-100 p-2 rounded-xl">
              <div 
                className="h-40 bg-white rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${item.product.product_image})` }}
              ></div>
              {editingProduct?.product._id === item.product._id ? (
                // Edit mode
                <div className="p-4 space-y-3">
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      price: Number(e.target.value)
                    })}
                    className="w-full p-2 rounded border"
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    value={editingProduct.quantity}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      quantity: Number(e.target.value)
                    })}
                    className="w-full p-2 rounded border"
                    placeholder="Quantity"
                  />
                  <input
                    type="number"
                    value={editingProduct.offer}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      offer: Number(e.target.value)
                    })}
                    className="w-full p-2 rounded border"
                    placeholder="Offer %"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateProduct(item.product._id, editingProduct)}
                      className="flex-1 bg-green-600 text-white p-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="flex-1 bg-gray-600 text-white p-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Display mode
                <>
                  <div className=" my-2  text-xl items-center flex justify-between">
                    <p className="  font-semibold">{item.product.product_name}</p>
                    <p className=" flex items-center  justify-center  mr-3 font-semibold">
                      <TbCurrencyRupee className=" text-green-600 size-6" />
                      <span className=" text-green-600">{item.price}</span>
                    </p>
                  </div>
                  <div className=" space-x-2 my-2 flex w-full items-center">
                    <p className=" flex-1 flex items-center  justify-center  space-x-2 text-pink-600 bg-pink-100 px-2 p-1 rounded-xl text-sm font-semibold">
                      <MdInventory />
                      <span>{item.quantity} Stock left</span>
                    </p>
                    <p className=" flex-1 flex items-center justify-center  space-x-2  text-sky-600 bg-sky-100 px-2 p-1 rounded-xl text-sm font-semibold">
                      <HiPercentBadge className=" size-5" />
                      <span>{item.offer}% Offer</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => handleEdit(item)}
                    className="w-full rounded-xl flex items-center justify-center space-x-4 text-white p-2 text-center bg-gray-800"
                  >
                    <span>Edit</span>
                    <FaEdit className="size-5" />
                  </button>
                </>
              )}
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
      )}

      {/* For Sale Modal */}
      {showForSaleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-3/4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Manage For Sale Items</h2>
              <button
                onClick={() => setShowForSaleModal(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {allProducts.map((item) => (
                <div key={item.product._id} className="flex items-center justify-between p-4 bg-gray-100 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.product_image}
                      alt={item.product.product_name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold">{item.product.product_name}</p>
                      <p className="text-gray-600">Price: ₹{item.price}</p>
                      <p className="text-gray-600">Stock: {item.quantity}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.for_sale}
                      onChange={() => handleToggleForSale(item.product._id, item.for_sale)}
                      className="sr-only peer"
                      disabled={item.quantity === 0}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {item.for_sale ? 'For Sale' : 'Not For Sale'}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
