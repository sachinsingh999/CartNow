import React, { useState } from "react";

const FilterSidebar = ({ productList, setFilteredList }) => {
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(1000);
  const [rating, setRating] = useState(0);

  const applyFilter = (cat, pr, rat) => {
    let data = [...productList];

    // Category filter
    if (cat !== "all") {
      data = data.filter(item =>
        item.category.toLowerCase().includes(cat)
      );
    }

    // Price filter
    data = data.filter(item => item.price <= pr);

    // Rating filter
    if (rat > 0) {
      data = data.filter(item => item.rating.rate >= rat);
    }

    setFilteredList(data);
  };

  const handleReset = () => {
    setCategory("all");
    setPrice(1000);
    setRating(0);
    setFilteredList(productList);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm w-full h-fit border border-gray-100">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg text-gray-800">Filters</h2>
        <button
          onClick={handleReset}
          className="text-sm text-indigo-600 hover:underline"
        >
          Reset
        </button>
      </div>

      {/* Category */}
      <div className="mb-5">
        <p className="text-sm font-medium mb-3 text-gray-600">Category</p>
        <div className="flex flex-wrap gap-2">
          {["all", "men", "women", "electronics"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                applyFilter(cat, price, rating);
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition
                ${category === cat
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              {cat === "all"
                ? "All"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 my-4" />

      {/* Price */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600">Price</p>
          <span className="text-sm font-medium text-gray-800">
            ${price}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="1000"
          value={price}
          onChange={(e) => {
            const value = Number(e.target.value);
            setPrice(value);
            applyFilter(category, value, rating);
          }}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$0</span>
          <span>$1000</span>
        </div>
      </div>

      <div className="border-t border-gray-100 my-4" />

      {/* Rating */}
      <div>
        <p className="text-sm font-medium mb-3 text-gray-600">Rating</p>
        <div className="flex flex-col gap-2">
          {[4, 3, 2].map((r) => (
            <button
              key={r}
              onClick={() => {
                setRating(r);
                applyFilter(category, price, r);
              }}
              className={`flex items-center px-3 py-2 rounded-lg text-sm transition
                ${rating === r
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"}`}
            >
              ⭐ {r} & up
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default FilterSidebar;
