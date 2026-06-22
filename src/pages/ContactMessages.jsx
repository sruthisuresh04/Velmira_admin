import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/contact/list`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      if (response.data.success) {
        setMessages(response.data.messages);
      } else {
        setError(response.data.message || "Unable to load messages.");
      }
    } catch (err) {
      setError(err.message || "Unable to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h1
        className="text-3xl font-bold text-white mb-8"
        style={{ fontFamily: "Cinzel" }}
      >
        Contact Messages
      </h1>

      {loading ? (
        <div className="text-gray-400">Loading messages...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : messages.length === 0 ? (
        <div className="text-gray-400">No contact messages found.</div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className="rounded-3xl border border-yellow-500/20 bg-black/40 p-6"
              style={{ backgroundColor: "#111111" }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {message.subject}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    From {message.name} · {message.email} · {message.phone}
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-yellow-500/10 px-3 py-1 text-yellow-300 text-xs font-semibold">
                  {new Date(message.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="mt-4 text-gray-200 whitespace-pre-line">
                {message.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
