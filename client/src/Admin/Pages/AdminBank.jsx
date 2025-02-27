import { useState, useEffect } from "react";
import { FaShop } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { HiPercentBadge } from "react-icons/hi2";
import { TbCurrencyRupee } from "react-icons/tb";
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminBank = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bankBusinessId] = useState('67c02301840e144cc3b07fdc');

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 67c022db840e144cc3b07fd9'
    }
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        setError(null);

        // Add skipAuth to query params
        const inventoryResponse = await api.get(`/inventories/${bankBusinessId}`, {
          params: { skipAuth: true }
        });
        
        console.log('Inventory:', inventoryResponse.data);

        if (!inventoryResponse.data) {
          throw new Error('No inventory found');
        }

        setProducts(inventoryResponse.data.products || []);
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setError(error.response?.data?.message || error.message);
        toast.error(error.response?.data?.message || 'Failed to load inventory');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [bankBusinessId]);

  const handleUpdateProduct = async (productId, updates) => {
    try {
      // Update product with skipAuth flag
      await api.put(`/inventories/${bankBusinessId}/products`, {
        productId,
        price: updates.price,
        quantity: updates.quantity,
        offer: updates.offer,
        for_sale: true,
        skipAuth: true
      });
      
      // Refresh products with skipAuth
      const response = await api.get(`/inventories/${bankBusinessId}`, {
        params: { skipAuth: true }
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
      <div className="overflow-hidden relative bg-gray-100 w-full h-60">
        <div className="space-y-2 text-6xl font-bold absolute top-10 left-5 text-gray-600">
          <p>Trade Zone Bank</p>
          <p className="text-gray-400 text-4xl font-semibold">
            Banking Sector
          </p>
        </div>
        <FaShop className="text-gray-600 -bottom-10 right-20 absolute size-60" />
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
        <div className="pb-10 grid grid-cols-3 px-10 gap-10">
          {products.map((item) => (
            <div key={item.product._id} className="relative bg-gray-100 p-2 rounded-xl">
              <div 
                className="h-40 bg-white rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${item.product.product_image})` }}
              />
              
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
                  <div className="my-2 text-xl items-center flex justify-between">
                    <p className="font-semibold">{item.product.product_name}</p>
                    <p className="flex items-center justify-center mr-3 font-semibold">
                      <TbCurrencyRupee className="text-green-600 size-6" />
                      <span className="text-green-600">{item.price}</span>
                    </p>
                  </div>
                  <div className="space-x-2 my-2 flex w-full items-center">
                    <p className="flex-1 flex items-center justify-center space-x-2 text-pink-600 bg-pink-100 px-2 p-1 rounded-xl text-sm font-semibold">
                      <MdInventory />
                      <span>{item.quantity} Stock left</span>
                    </p>
                    <p className="flex-1 flex items-center justify-center space-x-2 text-sky-600 bg-sky-100 px-2 p-1 rounded-xl text-sm font-semibold">
                      <HiPercentBadge className="size-5" />
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBank;