import React, { useEffect, useState } from "react";
import ProductCard from "../pages/ProductCard";
import Category from "../pages/Category";
import FilterSidebar from "../componenets/FilterSidebar";

const Men = () => {
  const [menProducts, setMenProducts] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        const onlyMen = data.filter(
          item => item.category === "men's clothing"
        );
        setMenProducts(onlyMen);
        setFilteredList(onlyMen); // 👈 important
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center">
          Men Products
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Sidebar */}
          <FilterSidebar
            productList={menProducts}
            setFilteredList={setFilteredList}
          />

          {/* Products */}
          <div className="md:col-span-3">
            <Category />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {filteredList.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Men;
