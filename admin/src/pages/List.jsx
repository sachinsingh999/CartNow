import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const removeProduct=async(id)=>{
    try {
      const response=await axios.post(backendUrl+'/api/product/remove',{id},{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();


      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      

      
    }


  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="text-lg font-semibold mb-4">All product list</p>

      {/* Table */}
      <div className="border rounded-md overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 bg-gray-100 px-4 py-3 font-semibold text-sm">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {/* Rows */}
        {list.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">No products found</p>
        ) : (
          list.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 items-center px-4 py-3 border-t text-sm"
            >
             <img
  src={`${backendUrl}/${item.images?.[0]}`}
  alt={item.name}
  className="w-12 h-12 object-contain bg-gray-100 rounded"
/>


              <span>{item.name}</span>
              <span>{item.category}</span>
              <span className="font-medium">₹{item.price}</span>
              <button onClick={()=>removeProduct(item._id)}
              
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-fit">
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default List;
