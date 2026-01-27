import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  images: {
    type: [String], // multiple images (Cloudinary URLs)
    required: true
  },

  category: {
    type: String,
    required: true
  },


  sizes: {
    type: [String], // S, M, L, XL
    required: true
  },

  

  date: {
    type: Date,
    default: Date.now
  }
});

const productModel =
  mongoose.models.product ||
  mongoose.model("product", productSchema);

export default productModel;
