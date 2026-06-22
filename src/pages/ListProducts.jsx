import React, { useEffect, useState } from "react";
import axios from "axios";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    rentPrice: "",
    category: "",
    image: null,
  });
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    const response = await axios.get(`${backendUrl}/api/product/list`);

    if (response.data.success) {
      setProducts(response.data.products);
    }
  };

  const deleteProduct = async (id) => {
    const response = await axios.delete(
      `${backendUrl}/api/product/delete`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
        data: { id },
      },
    );

    if (response.data.success) {
      setProducts((prevProducts) =>
        prevProducts.filter((item) => item._id !== id),
      );
    } else {
      alert(response.data.message);
    }
  };

  const normalizeCategory = (category) => {
    if (!category) return "";
    const normalized = category.toString().trim().toLowerCase();
    if (normalized === "ring" || normalized === "rings") return "Rings";
    if (normalized === "necklace" || normalized === "necklaces")
      return "Necklace";
    if (normalized === "earring" || normalized === "earrings")
      return "Earrings";
    if (normalized === "bangle" || normalized === "bangles") return "Bangles";
    return category;
  };

  const categoryOptions = ["Necklace", "Earrings", "Bangles", "Rings"];

  const startEdit = (product) => {
    setEditingProduct(product);
    setEditData({
      name: product.name,
      description: product.description,
      rentPrice: product.rentPrice,
      category: normalizeCategory(product.category),
      image: null,
    });
    setMessage("");
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setEditData({
      name: "",
      description: "",
      rentPrice: "",
      category: "",
      image: null,
    });
    setMessage("");
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", editingProduct._id);
    formData.append("name", editData.name);
    formData.append("description", editData.description);
    formData.append("rentPrice", editData.rentPrice);
    formData.append("category", editData.category);
    if (editData.image) {
      formData.append("image", editData.image);
    }

    const response = await axios.put(
      `${backendUrl}/api/product/update`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );

    if (response.data.success) {
      setProducts((prevProducts) =>
        prevProducts.map((item) =>
          item._id === editingProduct._id ? response.data.product : item,
        ),
      );
      cancelEdit();
    } else {
      alert(response.data.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1
        className="text-3xl font-bold text-white mb-8"
        style={{ fontFamily: "Cinzel" }}
      >
        Product Management
      </h1>

      {editingProduct && (
        <div
          className="mb-10 rounded-3xl border border-yellow-500/20 bg-black/40 p-6"
          style={{ backgroundColor: "#111111" }}
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl text-white font-semibold">
                Edit Product
              </h2>
              <p className="text-gray-400 text-sm">
                Update the fields below and save changes.
              </p>
            </div>
            <button
              onClick={cancelEdit}
              className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
            >
              Cancel
            </button>
          </div>

          {message && <div className="mb-4 text-green-400">{message}</div>}

          <form
            onSubmit={handleEditSubmit}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <label className="block text-gray-300 text-sm mb-2">
                Product Name
              </label>
              <input
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-500 transition"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-300 text-sm mb-2">
                Description
              </label>
              <textarea
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-500 transition"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Rental Price
              </label>
              <input
                type="number"
                value={editData.rentPrice}
                onChange={(e) =>
                  setEditData({ ...editData, rentPrice: e.target.value })
                }
                className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-2">
                Category
              </label>
              <select
                value={editData.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
                className="w-full bg-slate-900/80 border border-yellow-500/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition appearance-none cursor-pointer"
                style={{ color: "#ffffff" }}
              >
                <option value="">Select Category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-gray-300 text-sm mb-2">
                New Image (optional)
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setEditData({ ...editData, image: e.target.files[0] })
                }
                className="w-full text-gray-100"
              />
            </div>

            <div className="sm:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-3 rounded-lg font-semibold transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No products found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-black/40 border border-yellow-500/20 rounded-xl p-5 hover:border-yellow-500/40 transition flex justify-between items-center"
              style={{ backgroundColor: "#111111" }}
            >
              <div className="flex items-center gap-4">
                <img
                  src={`${backendUrl}${item.image}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-yellow-500/20"
                />

                <div>
                  <h3 className="font-bold text-xl text-white">{item.name}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-yellow-500 font-semibold">
                      ₹{item.rentPrice}/day
                    </span>
                    <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(item)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg transition font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(item._id)}
                  className="bg-red-600/80 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListProducts;
