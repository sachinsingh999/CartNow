import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { useNavigate } from "react-router-dom";

const Orderdetail = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.post(
          `${backendUrl}/api/order/userOrder`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          const allOrdersItem = [];

          response.data.orders.forEach((order) => {
            order.items.forEach((item) => {
              allOrdersItem.push({
                ...item,
                orderId: order._id,
                status: order.orderStatus,
                payment: order.paymentStatus === "paid",
                paymentMethod: order.paymentMethod,
                date: order.createdAt,
                amount: order.amount,
                address: order.address,
              });
            });
          });

          setOrderData(allOrdersItem.reverse());
        }
      } catch (error) {
        console.log("ORDER FETCH ERROR 👉", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <span className="text-gray-500">Loading orders...</span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orderData.length === 0 && (
        <div className="border rounded p-6 text-center text-gray-500">
          No orders found
        </div>
      )}

      <div className="space-y-4">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-4 grid grid-cols-[80px_1fr_auto] gap-4 items-center"
          >
            {/* IMAGE */}
            <div className="w-20 h-20 bg-gray-50 flex items-center justify-center rounded">
              <img
                src={`${backendUrl}/${item.image}`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* DETAILS */}
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.qty} • Size: {item.size}
              </p>

              <div className="mt-2 flex flex-wrap gap-3 text-xs">
                <span className="text-gray-500">
                  Date: {new Date(item.date).toLocaleDateString()}
                </span>

                <span
                  className={`px-2 py-1 rounded-full ${
                    item.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : item.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {item.status}
                </span>

                <span
                  className={`px-2 py-1 rounded-full ${
                    item.payment
                      ? "bg-indigo-100 text-indigo-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.payment ? "Paid" : "Pending"}
                </span>

                <span className="text-gray-400">
                  {item.paymentMethod.toUpperCase()}
                </span>
              </div>
            </div>

            {/* PRICE & ACTION */}
            <div className="text-right">
              <p className="font-bold text-lg">
                ₹{item.price * item.qty}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Order ID: {item.orderId}
              </p>

              <button
                onClick={() =>
                  navigate(`/track/${item.orderId}`, { state: { item } })
                }
                className="mt-2 px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Track
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orderdetail;
