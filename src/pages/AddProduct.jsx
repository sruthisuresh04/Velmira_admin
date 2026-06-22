import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [category, setCategory] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("rentPrice", rentPrice);
      formData.append("category", category);
      formData.append("image", image);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      if (response.data.success) {
        alert("Product Added Successfully");

        setName("");
        setDescription("");
        setRentPrice("");
        setCategory("");
        setImage(null);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="max-w-3xl">
      <div
        className="bg-black/40 border border-yellow-500/20 rounded-2xl p-8"
        style={{ backgroundColor: "#111111" }}
      >
        <h1
          className="text-3xl font-bold text-white mb-8"
          style={{ fontFamily: "Cinzel" }}
        >
          Add New Product
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          <FormInput
            label="Product Name"
            type="text"
            placeholder="e.g., Diamond Necklace"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <FormInput
            label="Description"
            type="text"
            placeholder="Product details and features"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <FormInput
            label="Rental Price (₹ per day)"
            type="number"
            placeholder="999"
            value={rentPrice}
            onChange={(e) => setRentPrice(e.target.value)}
            required
          />

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23FCD34D' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                paddingRight: "40px",
              }}
              required
            >
              <option
                value=""
                style={{ backgroundColor: "#1f1f1f", color: "#999" }}
              >
                Select Category
              </option>
              <option
                value="Necklace"
                style={{ backgroundColor: "#1f1f1f", color: "white" }}
              >
                Necklace
              </option>
              <option
                value="Earrings"
                style={{ backgroundColor: "#1f1f1f", color: "white" }}
              >
                Earrings
              </option>
              <option
                value="Bangles"
                style={{ backgroundColor: "#1f1f1f", color: "white" }}
              >
                Bangles
              </option>
              <option
                value="Rings"
                style={{ backgroundColor: "#1f1f1f", color: "white" }}
              >
                Rings
              </option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-3">
              Product Image
            </label>
            <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-yellow-500/30 rounded-lg hover:border-yellow-500/60 cursor-pointer transition">
              <input
                type="file"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
              <div className="text-center">
                <span className="text-2xl mb-2 block">📸</span>
                <p className="text-gray-300">Click to upload product image</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition transform hover:scale-105 mt-8"
          >
            ✓ Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

const FormInput = ({ label, type, placeholder, value, onChange, required }) => (
  <div>
    <label className="block text-gray-300 text-sm font-medium mb-3">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-500 transition"
      required={required}
    />
  </div>
);

export default AddProduct;
