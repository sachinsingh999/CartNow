import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [method, setMethod] = useState("cod");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ---------------- PRODUCTS ---------------- */
  const singleProduct = location.state?.product;
  const cartItems = location.state?.cartItems;

  const qty = location.state?.qty || 1;
  const size = location.state?.size || "N/A";

  const products = cartItems
    ? cartItems
    : singleProduct
    ? [{ ...singleProduct, qty, size }]
    : [];

  const subtotal = products.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = 10;
  const total = subtotal + shipping;

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>No product selected</p>
      </div>
    );
  }

  /* ---------------- SUBMIT ---------------- */
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first");
      return;
    }

    const requiredFields = [
      "firstName",
      "email",
      "street",
      "city",
      "state",
      "country",
      "phone",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setError("All fields are required");
        return;
      }
    }

    const address = { ...formData };

    // ✅ backend & stripe friendly format
    const items = products.map((item) => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.qty,
      size: item.size,
      image: item.images?.[0],
    }));

    try {
      setLoading(true);

      let url = "";
      let response;

      /* ========= SWITCH CASE PAYMENT ========= */
      switch (method) {
        case "stripe":
          url = `${backendUrl}/api/order/stripe`;
          response = await axios.post(
            url,
            { items, amount: total, address },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            console.log(response.data);
            
            window.location.href = response.data.session_url;
          }
          break;

        case "cod":
          url = `${backendUrl}/api/order/place`;
          response = await axios.post(
            url,
            { items, amount: total, address, paymentMethod: "COD" },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (response.data.success) {
            navigate("/orderdetail", {
              state: { order: response.data.order },
            });
          }
          break;

        case "razorpay":
          setError("Razorpay integration coming soon");
          break;

        default:
          setError("Invalid payment method");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-14"
    >
      {/* LEFT */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-6 border-b pb-2">
          Delivery Information
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input name="firstName" placeholder="First Name" onChange={onChangeHandler} className="border px-4 py-3" />
          <input name="lastName" placeholder="Last Name" onChange={onChangeHandler} className="border px-4 py-3" />
        </div>

        <input name="email" placeholder="Email" onChange={onChangeHandler} className="border px-4 py-3 w-full mb-4" />
        <input name="street" placeholder="Street Address" onChange={onChangeHandler} className="border px-4 py-3 w-full mb-4" />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input name="city" placeholder="City" onChange={onChangeHandler} className="border px-4 py-3" />
          <input name="state" placeholder="State" onChange={onChangeHandler} className="border px-4 py-3" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="country" placeholder="Country" onChange={onChangeHandler} className="border px-4 py-3" />
          <input name="phone" placeholder="Phone" onChange={onChangeHandler} className="border px-4 py-3" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">
          Order Summary
        </h2>

        <div className="space-y-4 mb-6">
          {products.map((item, i) => (
            <div key={i} className="flex justify-between border p-3 rounded">
              <p>{item.name} × {item.qty}</p>
              <p>₹{item.price * item.qty}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>₹{shipping}</span></div>
          <div className="flex justify-between font-bold"><span>Total</span><span>₹{total}</span></div>
        </div>

        <div className="flex gap-3 mb-6">
          {["stripe", "razorpay", "cod"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={`flex-1 border py-2 ${method === m ? "bg-black text-white" : ""}`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>

        <button disabled={loading} className="w-full bg-black text-white py-4 rounded">
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;
