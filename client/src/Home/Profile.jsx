/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { FaShop } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import Userdata from "../data2/Userdata";
import avatar from "../assets/img/avatar.png";
import { MdInventory } from "react-icons/md";
import { HiPercentBadge } from "react-icons/hi2";
import { TbCurrencyRupee } from "react-icons/tb";
import Productdata from "../data2/Productdata";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
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
        setProducts(inventoryResponse.data.products || []);
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
      <div className=" my-5 flex items-center justify-center bg-gray-100  *:p-2 space-x-4 *:rounded-xl *:px-3">
        {/* <p>Purchased</p>
        <p>Sold</p> */}{" "}
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
    </div>
  );
};

export default Profile;
