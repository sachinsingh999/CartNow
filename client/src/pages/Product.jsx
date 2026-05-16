import React, { useEffect, useState } from "react";
import ProductCard from "../pages/ProductCard";
import Category from "../pages/Category";
import FilterSidebar from "../componenets/FilterSidebar";
import axios from 'axios'
import { backendUrl } from "../App";
import {toast} from 'react-toastify'
const Product = () => {
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);



  const getProductData=async()=>{
    try {
      const response=await axios.get('http://localhost:4000/api/product/list');
      if(response.data.success){
        setProductList(response.data.products)
        setFilteredList(response.data.products);
      }else{
        toast.error(response.data.message)
      }
      


      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      
    }
  }



  useEffect(() => {
   getProductData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-10">
          Our Products
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Sidebar */}
          <FilterSidebar
            productList={productList}
            setFilteredList={setFilteredList}
          />

          {/* Products */}
          <div className="md:col-span-3">
            {/* <Category /> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {filteredList.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Product;
