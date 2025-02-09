import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TbCurrencyRupee } from "react-icons/tb";
import ButtonComponent from "../Components/ButtonComponent";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state.product;

  const [formData, setFormData] = useState({
    price: product.price || "",
    discount: "20", // Default discount value
    stock: "20", // Default stock value
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated product data:", formData);
    navigate("/profile");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!product) {
    return <div>No product data found</div>;
  }

  return (
    <div className="p-10">
      <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Edit Product</h2>

        <div className="flex gap-8 mb-8">
          <div className="w-1/3">
            <img
              src={product.image}
              className="bg-gray-100 rounded-xl h-40 mb-4 object-cover"
            />
            <p className="text-xl font-semibold">{product.name}</p>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 space-y-6">
            <div className="space-y-2">
              <label className="text-lg font-semibold block">Price (₹)</label>
              <div className="relative">
                <TbCurrencyRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 size-6" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 pl-12 rounded-xl border-2 focus:border-indigo-600 outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-lg font-semibold block">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border-2 focus:border-indigo-600 outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-lg font-semibold block">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border-2 focus:border-indigo-600 outline-none"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <ButtonComponent type="submit" name="Save Changes" />
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="w-full text-lg flex items-center font-semibold justify-center cursor-pointer rounded-2xl bg-gray-200 p-3 px-10 text-gray-800 transition-all duration-200 ease-in-out hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
