import React from "react";

const Sidebar = ({ setPage, logout }) => {
  return (
    <div
      className="w-64 min-h-screen bg-black border-r border-yellow-500/20 text-white p-6"
      style={{ backgroundColor: "#090909" }}
    >
      <h1
        className="text-2xl font-bold text-yellow-500 mb-2"
        style={{ fontFamily: "Cinzel" }}
      >
        VELMIRA
      </h1>
      <p className="text-xs text-gray-400 mb-8">Admin Dashboard</p>

      <nav className="space-y-2 mb-12">
        <SidebarItem
          icon="📊"
          label="Dashboard"
          onClick={() => setPage("dashboard")}
        />
        <SidebarItem
          icon="➕"
          label="Add Product"
          onClick={() => setPage("addProduct")}
        />
        <SidebarItem
          icon="📦"
          label="Products"
          onClick={() => setPage("products")}
        />
        <SidebarItem
          icon="📋"
          label="Bookings"
          onClick={() => setPage("bookings")}
        />
        <SidebarItem
          icon="✉️"
          label="Messages"
          onClick={() => setPage("messages")}
        />
      </nav>

      <button
        onClick={logout}
        className="w-full bg-red-600/80 hover:bg-red-600 text-white py-2 rounded-lg transition font-semibold"
      >
        Logout
      </button>
    </div>
  );
};

const SidebarItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-yellow-500/10 hover:text-yellow-500 transition text-left text-gray-300 hover:border-l-2 hover:border-yellow-500"
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium">{label}</span>
  </button>
);

export default Sidebar;
