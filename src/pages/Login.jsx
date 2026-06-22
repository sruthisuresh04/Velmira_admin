import React, { useState } from "react";
import axios from "axios";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/login`,
        { email, password },
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black"
      style={{ backgroundColor: "#090909" }}
    >
      <div className="w-full max-w-md">
        <div
          className="bg-black border border-yellow-500/20 p-8 rounded-2xl"
          style={{ backgroundColor: "#111111" }}
        >
          <h1
            className="text-3xl font-bold text-center text-yellow-500 mb-2"
            style={{ fontFamily: "Cinzel" }}
          >
            VELMIRA
          </h1>
          <p className="text-center text-gray-400 text-sm mb-8">
            Admin Control Panel
          </p>

          <form onSubmit={onSubmitHandler}>
            <div className="mb-5">
              <label className="block text-gray-300 text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="admin@velmira.com"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-lg transition transform hover:scale-105">
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-6">
            Admin Login Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
