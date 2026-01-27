import React from "react";

const Rating = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-8">

      {/* LEFT: AVERAGE RATING */}
      <div className="bg-gray-50 border rounded-2xl p-6 text-center w-full sm:w-64">
        <p className="text-5xl font-bold text-gray-900">
          4.4
        </p>

        <div className="text-yellow-500 text-xl mt-2">
          ★★★★☆
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Based on 128 ratings
        </p>
      </div>

      {/* RIGHT: RATING DISTRIBUTION */}
      <div className="flex-1 space-y-3">

        {[5, 4, 3, 2, 1].map((star) => (
          <div
            key={star}
            className="flex items-center gap-3 text-sm"
          >
            <span className="w-10 font-medium">
              {star} ★
            </span>

            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${star * 12}%` }}
              />
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Rating;
