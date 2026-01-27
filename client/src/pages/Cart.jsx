import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const cartRes = await axios.post(
          `${backendUrl}/api/cart/get`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ FIX
            },
          }
        );

        if (!cartRes.data.success) return;

        const cartData = cartRes.data.cartData || {};
        const items = [];

        // 🔥 cartData format: { "productId_size": qty }
        for (let key in cartData) {
  const [itemId, size] = key.split("_");
  const qty = cartData[key];

  if (qty > 0) {
    const productRes = await axios.get(
      `${backendUrl}/api/product/single/${itemId}`
    );

    items.push({
      itemId,
      size,
      qty,
      product: productRes.data.product,
    });
  }
}



        setCartItems(items);
      } catch (error) {
        console.log("CART FETCH ERROR:", error);
      }
    };

    fetchCart();
  }, [token, navigate]);

  // 🔹 UPDATE QUANTITY
  const updateQty = async (index, newQty) => {
    if (newQty < 1) return;

    const item = cartItems[index];

    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/update`,
        {
          itemId: item.itemId,
          size: item.size,
          qty: newQty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIX
          },
        }
      );

      if (res.data.success) {
        const updated = [...cartItems];
        updated[index].qty = newQty;
        setCartItems(updated);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 REMOVE ITEM
  const removeItem = async (index) => {
    const item = cartItems[index];

    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/update`,
        {
          itemId: item.itemId,
          size: item.size,
          qty: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIX
          },
        }
      );

      if (res.data.success) {
        setCartItems(cartItems.filter((_, i) => i !== index));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-black text-white rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">YOUR CART</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-6"
            >
              <div className="flex gap-6">
                <img
                  src={`${backendUrl}/${item.product.images[0]}`}
                  className="h-24 w-24 object-contain"
                  alt={item.product.name}
                />

                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    ₹{item.product.price}
                  </p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs border">
                    {item.size}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) =>
                    updateQty(index, Number(e.target.value))
                  }
                  className="w-14 border text-center"
                />

                <button
                  onClick={() => removeItem(index)}
                  className="text-gray-500 hover:text-red-600"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="border p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">CART TOTALS</h2>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={() =>
              navigate("/placeorder", {
                state: {
                  cartItems: cartItems.map((item) => ({
                    ...item.product,
                    qty: item.qty,
                    size: item.size,
                  })),
                  total,
                },
              })
            }
            className="w-full mt-6 bg-black text-white py-3"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
