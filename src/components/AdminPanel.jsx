import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ListProducts from "../pages/ListProducts";
import BookingPanel from "../pages/BookingPanel";
import Dashboard from "../pages/Dashboard";
import AddProduct from "../pages/AddProduct";
import ContactMessages from "../pages/ContactMessages";

const AdminPanel = ({ setToken }) => {
  const [page, setPage] = useState("dashboard");

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div
      className="flex min-h-screen bg-black"
      style={{ backgroundColor: "#090909" }}
    >
      <Sidebar setPage={setPage} logout={logout} />

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-medium">
          {page === "dashboard" && <Dashboard />}
          {page === "products" && <ListProducts />}
          {page === "addProduct" && <AddProduct />}
          {page === "bookings" && <BookingPanel />}
          {page === "messages" && <ContactMessages />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
