import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({token}) => {
  // images
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Women");

  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);


  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };
   
  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();

// text fields
formData.append("name", name);
formData.append("description", description);
formData.append("price", price);
formData.append("category", category);
// sizes (array → backend friendly)
sizes.forEach((size) => {
  formData.append("sizes", size);
});

// images (ONLY if selected)
if (image1) formData.append("image1", image1);
if (image2) formData.append("image2", image2);
if (image3) formData.append("image3", image3);
if (image4) formData.append("image4", image4);
 
const response=await axios.post(backendUrl+'/api/product/add',formData,{headers:{token}})
if(response.data.success){
  toast.success(response.data.message)
  setName('')
  setImage1(false)
  setImage2(false)
  setImage3(false)
  setImage4(false)
  setPrice('')

}else{
  toast.error(response.data.message)
}



      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
      
    }

  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-4xl">
      {/* Upload Images */}
      <h2 className="text-lg font-semibold mb-4">Upload Image</h2>

      <div className="flex gap-4 mb-6">
        {/* Image 1 */}
        <label htmlFor="image1" className="cursor-pointer">
          <img
            className="w-20 border border-dashed rounded-md p-2"
            src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
            alt=""
          />
          <input
            type="file"
            id="image1"
            hidden
            onChange={(e) => setImage1(e.target.files[0])}
          />
        </label>

        {/* Image 2 */}
        <label htmlFor="image2" className="cursor-pointer">
          <img
            className="w-20 border border-dashed rounded-md p-2"
            src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
            alt=""
          />
          <input
            type="file"
            id="image2"
            hidden
            onChange={(e) => setImage2(e.target.files[0])}
          />
        </label>

        {/* Image 3 */}
        <label htmlFor="image3" className="cursor-pointer">
          <img
            className="w-20 border border-dashed rounded-md p-2"
            src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
            alt=""
          />
          <input
            type="file"
            id="image3"
            hidden
            onChange={(e) => setImage3(e.target.files[0])}
          />
        </label>

        {/* Image 4 */}
        <label htmlFor="image4" className="cursor-pointer">
          <img
            className="w-20 border border-dashed rounded-md p-2"
            src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
            alt=""
          />
          <input
            type="file"
            id="image4"
            hidden
            onChange={(e) => setImage4(e.target.files[0])}
          />
        </label>
      </div>

      {/* Product Name */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Product name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type here"
          className="w-full border px-3 py-2 rounded-md"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm mb-1">Product description</label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write content here"
          className="w-full border px-3 py-2 rounded-md resize-none"
        />
      </div>

      {/* Category / Sub / Price */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Product category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-2 py-2 rounded-md"
          >
            <option>Women</option>
            <option>Men</option>
            <option>Kid</option>
          </select>
        </div>

        {/* <div>
          <label className="block text-sm mb-1">Sub category</label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border px-2 py-2 rounded-md"
          >
            <option>Topwear</option>
            <option>Bottomwear</option>
          </select>
        </div> */}

        <div>
          <label className="block text-sm mb-1">Product Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-4">
        <label className="block text-sm mb-2">Product Sizes</label>
        <div className="flex gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 border rounded cursor-pointer text-sm
                ${
                  sizes.includes(size)
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <span className="text-sm">Add to bestseller</span>
      </div> */}

      {/* Submit */}
      <button type="submit"
      className="bg-black text-white px-8 py-2 rounded-md">
        ADD
      </button>
    </div>
    </form>
  );
};

export default Add;
