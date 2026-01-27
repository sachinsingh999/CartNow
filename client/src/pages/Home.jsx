import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex items-center">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6">

        {/* LEFT */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Discover <span className="text-black">Premium Products</span><br />
            For Your Lifestyle
          </h1>

          <p className="text-gray-600 mt-5 text-lg">
            Handpicked collections that blend quality, comfort and modern style.
            Upgrade your everyday experience with us.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/product")}
              className="px-7 py-3 bg-black text-white rounded-lg hover:scale-105 transition font-medium shadow-lg"
            >
              Explore Products
            </button>

            <button
              className="px-7 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition font-medium"
            >
              Learn More
            </button>
          </div>

          {/* STATS */}
          <div className="flex gap-10 mt-10">
            <div>
              <h2 className="text-3xl font-bold">10k+</h2>
              <p className="text-gray-500 text-sm">Happy Customers</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">500+</h2>
              <p className="text-gray-500 text-sm">Premium Products</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">24/7</h2>
              <p className="text-gray-500 text-sm">Support</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md">

            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
              alt="shopping"
              className="rounded-2xl mb-6"
            />

            <h3 className="text-xl font-semibold">
              Trendy & Affordable
            </h3>

            <p className="text-gray-600 mt-2 text-sm">
              Explore latest trends curated just for you.
            </p>

            <button
              onClick={() => navigate("/product")}
              className="mt-5 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Shop Now
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
