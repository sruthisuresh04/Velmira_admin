import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const productRes = await axios.get(
      `${backendUrl}/api/product/list`,
    );

    const bookingRes = await axios.get(
      `${backendUrl}/api/booking/list`,
    );

    if (productRes.data.success) {
      setProducts(productRes.data.products);
    }

    if (bookingRes.data.success) {
      setBookings(bookingRes.data.bookings);
    }
  };

  const revenue = bookings.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0,
  );

  return (
    <div>
      <h1
        className="text-4xl font-bold text-white mb-8"
        style={{ fontFamily: "Cinzel" }}
      >
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DashboardCard
          title="Total Products"
          value={products.length}
          icon="📦"
          color="from-blue-500"
        />
        <DashboardCard
          title="Total Bookings"
          value={bookings.length}
          icon="📅"
          color="from-purple-500"
        />
        <DashboardCard
          title="Revenue"
          value={`₹ ${revenue.toLocaleString("en-IN")}`}
          icon="💰"
          color="from-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="bg-black/40 border border-yellow-500/20 rounded-2xl p-6"
          style={{ backgroundColor: "#111111" }}
        >
          <h2
            className="text-xl font-bold text-yellow-500 mb-4"
            style={{ fontFamily: "Cinzel" }}
          >
            Recent Bookings
          </h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {bookings.slice(0, 5).map((booking) => (
              <div
                key={booking._id}
                className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div>
                  <p className="text-white font-medium">{booking.userName}</p>
                  <p className="text-gray-400 text-sm">{booking.productName}</p>
                </div>
                <span className="text-yellow-500 font-semibold">
                  ₹{booking.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="bg-black/40 border border-yellow-500/20 rounded-2xl p-6"
          style={{ backgroundColor: "#111111" }}
        >
          <h2
            className="text-xl font-bold text-yellow-500 mb-4"
            style={{ fontFamily: "Cinzel" }}
          >
            Quick Stats
          </h2>
          <div className="space-y-4">
            <StatRow
              label="Average Booking Value"
              value={`₹ ${bookings.length > 0 ? Math.round(revenue / bookings.length) : 0}`}
            />
            <StatRow
              label="Pending Bookings"
              value={bookings.filter((b) => b.status === "Pending").length}
            />
            <StatRow
              label="Approved Bookings"
              value={bookings.filter((b) => b.status === "Approved").length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon, color }) => (
  <div
    className="bg-black/40 border border-yellow-500/20 rounded-2xl p-6 hover:border-yellow-500/40 transition"
    style={{ backgroundColor: "#111111" }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
      </div>
      <span className="text-4xl">{icon}</span>
    </div>
  </div>
);

const StatRow = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
    <span className="text-gray-400 text-sm">{label}</span>
    <span className="text-yellow-500 font-semibold">{value}</span>
  </div>
);

export default Dashboard;
