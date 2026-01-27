import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { backendUrl } from "../App";

const steps = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const Track = () => {
  const { id } = useParams();
  const location = useLocation();

  // order item passed from Orderdetail.jsx
  const passedItem = location.state?.item;

  const [item, setItem] = useState(passedItem || null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!passedItem) return;

    const statusMap = {
      "order placed": 0,
      packed: 1,
      shipped: 2,
      "out for delivery": 3,
      delivered: 4,
    };

    const key = passedItem.status?.toLowerCase();
    setCurrentStep(statusMap[key] ?? 0);
  }, [passedItem]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Track Your Order
        </h1>

        <p className="text-center text-xs text-gray-500 mb-6">
          Order ID: <span className="font-mono">{id}</span>
        </p>

        {/* PRODUCT */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`${backendUrl}/${item.image}`}
            alt={item.name}
            className="h-20 w-20 object-cover rounded bg-gray-100"
          />

          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">
              Qty: {item.qty} • Size: {item.size}
            </p>
            <p className="font-bold mt-1">
              ₹{item.price * item.qty}
            </p>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="relative mb-8">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded"></div>

          <div
            className="absolute top-4 left-0 h-1 bg-green-500 rounded transition-all duration-700"
            style={{
              width: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          ></div>

          <div className="flex justify-between relative">
            {steps.map((step, index) => {
              const completed = index < currentStep;
              const active = index === currentStep;

              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center
                      ${
                        completed
                          ? "bg-green-500"
                          : active
                          ? "border-2 border-green-500 bg-white"
                          : "bg-gray-300"
                      }`}
                  >
                    {completed && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>

                  <p
                    className={`text-xs mt-2 text-center
                      ${
                        completed || active
                          ? "text-green-600 font-semibold"
                          : "text-gray-400"
                      }`}
                  >
                    {step}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CURRENT STATUS */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500">Current Status</p>
          <p className="font-bold text-lg text-green-600">
            {steps[currentStep]}
          </p>
        </div>

        {/* BACK */}
        <button
          onClick={() => window.history.back()}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Track;
