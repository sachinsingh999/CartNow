import React from "react";

const CostomersReviews = () => {
  return (
    <div className="space-y-3">

      {/* Review */}
      <div className="border rounded-lg p-4 text-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-900">Rahul Sharma</p>
            <p className="text-xs text-gray-500">Verified Buyer · 2 days ago</p>
          </div>
          <span className="text-yellow-500 text-xs">★★★★☆</span>
        </div>

        <p className="mt-2 text-gray-700">
          Quality bahut achi hai, fitting bhi perfect.
        </p>
      </div>

      {/* Review */}
      <div className="border rounded-lg p-4 text-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-900">Anjali Verma</p>
            <p className="text-xs text-gray-500">Verified Buyer · 1 week ago</p>
          </div>
          <span className="text-yellow-500 text-xs">★★★★★</span>
        </div>

        <p className="mt-2 text-gray-700">
          Fabric premium lagta hai, delivery fast thi.
        </p>
      </div>

    </div>
  );
};

export default CostomersReviews;
