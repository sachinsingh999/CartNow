import React from "react";

const GiveReview = () => {
  return (
    <div className="space-y-6">

      {/* WRITE REVIEW */}
      <div className="border rounded-xl p-5 bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">
          Write a Review
        </h3>

        {/* Rating */}
        <div className="mb-3">
          <label className="block text-xs font-medium mb-1">
            Rating
          </label>
          <select className="w-40 border rounded-md px-2 py-1.5 text-sm">
            <option value="">Select</option>
            <option value="5">★★★★★ Excellent</option>
            <option value="4">★★★★☆ Good</option>
            <option value="3">★★★☆☆ Average</option>
            <option value="2">★★☆☆☆ Poor</option>
            <option value="1">★☆☆☆☆ Bad</option>
          </select>
        </div>

        {/* Review */}
        <div className="mb-4">
          <label className="block text-xs font-medium mb-1">
            Review
          </label>
          <textarea
            rows="3"
            placeholder="Share your experience"
            className="w-full border rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Submit */}
        <button className="bg-black text-white text-sm px-5 py-2 rounded-md hover:bg-gray-800 transition">
          Submit
        </button>
      </div>

      {/* TRUST INFO */}
      <div className="grid grid-cols-3 gap-3 text-center text-xs">
        <div className="border rounded-lg p-3 bg-white">
          🚚
          <p className="font-medium mt-1">Free Delivery</p>
        </div>

        <div className="border rounded-lg p-3 bg-white">
          🔄
          <p className="font-medium mt-1">Easy Returns</p>
        </div>

        <div className="border rounded-lg p-3 bg-white">
          🔒
          <p className="font-medium mt-1">Secure Pay</p>
        </div>
      </div>

    </div>
  );
};

export default GiveReview;
