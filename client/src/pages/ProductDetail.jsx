import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import Rating from "../componenets/Rating";
import CostomersReviews from "../componenets/CostomersReviews";
import GiveReview from "../componenets/GiveReview";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`${backendUrl}/api/product/single/${id}`);
      const data = await res.json();
      setProduct(data.product);
      setMainImg(data.product.images[0]);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );
  }

  const handleBuyNow = () => {
    if (!size) return alert("Please select size");
    navigate("/placeorder", {
      state: { product, qty, size, total: product.price * qty },
    });
  };

  const handleCart = async () => {
    if (!size) return alert("Please select size");

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    await axios.post(
      `${backendUrl}/api/cart/add`,
      { itemId: product._id, size, qty },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    navigate("/cart");
  };

  return (
  <div className="max-w-7xl mx-auto px-4 py-12">
  {/* BACK */}
  <button
    onClick={() => navigate(-1)}
    className="mb-6 text-sm text-gray-500 hover:text-gray-700 transition-colors"
  >
    ← Back
  </button>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
    {/* IMAGE SECTION */}
    <div>
      <div className="bg-gray-50 rounded-2xl p-6 flex justify-center">
        <img
          src={
            mainImg.startsWith("http")
              ? mainImg
              : `${backendUrl}/${mainImg}`
          }
          alt={product.name}
          className="h-[420px] object-contain"
        />
      </div>

      <div className="flex gap-3 mt-5 justify-center">
        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setMainImg(img)}
            className={`p-1 rounded-xl transition ${
              mainImg === img
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            <img
              src={img.startsWith("http") ? img : `${backendUrl}/${img}`}
              className="h-20 w-20 object-contain"
              alt="thumb"
            />
          </button>
        ))}
      </div>
    </div>

    {/* INFO */}
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-2xl font-semibold mt-3 text-green-600">
        ₹{product.price}
      </p>

      <p className="text-gray-600 mt-5 leading-relaxed">
        {product.description}
      </p>

      {/* SIZE */}
      <div className="mt-8">
        <p className="font-medium mb-2">Select Size</p>
        <div className="flex gap-3 flex-wrap">
          {product.sizes.map((s, i) => (
            <button
              key={i}
              onClick={() => setSize(s)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                size === s
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* QTY */}
      <div className="mt-6">
        <p className="font-medium mb-2">Quantity</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => qty > 1 && setQty(qty - 1)}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            −
          </button>
          <span className="font-semibold">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            +
          </button>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="mt-10 flex gap-4">
        <button
          onClick={handleCart}
          className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>

  {/* REVIEWS */}
  <div className="mt-24 space-y-12">
    <section className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">
        Customer Ratings
      </h3>
      <Rating />
    </section>

    <section className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        Customer Reviews
      </h3>
      <CostomersReviews />
    </section>

    <section className="bg-gray-50 rounded-xl p-6">
      <GiveReview />
    </section>
  </div>
</div>

  );
};

export default ProductDetail;
