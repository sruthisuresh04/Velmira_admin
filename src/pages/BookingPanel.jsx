import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingPanel = () => {
const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get(`${backendUrl}/api/booking/list`);

    if (res.data.success) {
      setBookings(res.data.bookings);
    }
  };

  const updateStatus = async (id, status) => {
    const res = await axios.post(`${backendUrl}/api/booking/status`, {
      id,
      status,
    });

    if (res.data.success) {
      fetchBookings();
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h1
        className="text-3xl font-bold text-white mb-8"
        style={{ fontFamily: "Cinzel" }}
      >
        Booking Management
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No bookings found</p>
        </div>
      ) : (
        <div
          className="bg-black/40 border border-yellow-500/20 rounded-2xl overflow-hidden"
          style={{ backgroundColor: "#111111" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-yellow-500/20 bg-black/60">
                  <th className="px-6 py-4 text-left text-yellow-500 font-semibold">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-yellow-500 font-semibold">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-yellow-500 font-semibold">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-yellow-500 font-semibold">
                    Rental Period
                  </th>
                  <th className="px-6 py-4 text-left text-yellow-500 font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-yellow-500 font-semibold">
                    Refund
                  </th>
                  <th className="px-6 py-4 text-left text-yellow-500 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-500/10">
                {bookings.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-yellow-500/5 transition"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">
                          {item.userName}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {item.productName}
                    </td>
                    <td className="px-6 py-4 text-yellow-500 font-semibold">
                      ₹{item.price}
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-xs">
                      <div>{new Date(item.rentDate).toLocaleDateString()}</div>
                      <div>
                        to {new Date(item.returnDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`bg-white/10 border border-white/20 text-white px-3 py-1 rounded-lg focus:outline-none focus:border-yellow-500 transition text-xs ${
                          item.status === "Approved"
                            ? "bg-green-500/20 text-green-400"
                            : item.status === "Returned"
                              ? "bg-blue-500/20 text-blue-400"
                              : item.status === "Cancelled"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {item.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-yellow-500 font-semibold">
                      ₹{item.refundAmount || 0}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={item.status || "Pending"}
                        onChange={(e) => updateStatus(item._id, e.target.value)}
                        className="bg-black/50 border border-white/20 text-white px-3 py-1 rounded-lg focus:outline-none focus:border-yellow-500 transition text-xs"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Returned">Returned</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPanel;
