import React from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../App";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/product/${product._id}`);
  };
  const handleCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push(product);

    localStorage.setItem("cart", JSON.stringify(existingCart));

    navigate(`/product/${product._id}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col">
      {/* Image */}
      <div className="h-48 w-full rounded mb-4 overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={`${backendUrl}/${product.images[0]}`}
          alt={product.name}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="font-medium text-base line-clamp-2">{product.name}</h3>

      {/* Price */}
      <p className="text-sm text-gray-700 mt-1 font-semibold">
        ${product.price}
      </p>

      {/* Rating */}
      <div className="flex items-center mt-2">
        <span className="text-yellow-500 mr-1">★</span>
        <span className="text-sm text-gray-600">
          {product.rating?.rate || "N/A"} ({product.rating?.count || 0})
        </span>
      </div>

      {/* Buttons */}
      <div className="mt-auto flex gap-2 pt-4">
        <button
          onClick={handleCart}
          className="flex-1 border border-gray-300 text-sm py-2 rounded hover:bg-gray-100"
        >
          Add to Cart
        </button>

        <button
          onClick={handleBuyNow}
          className="flex-1 bg-black text-white text-sm py-2 rounded hover:bg-gray-800"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
