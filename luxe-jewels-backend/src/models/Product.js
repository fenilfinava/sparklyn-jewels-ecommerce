const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  stock: { type: Number, default: 0 },
  mainCategory: { 
    type: String, 
    enum: ['Rings', 'Bracelets', 'Earrings', 'Necklaces'],
    required: true 
  },
  subCategory: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subcategory'
  },
  shapes: [{ type: String }],
  isActive: { type: Boolean, default: true },
  images: [{
    url: String,
    publicId: String,
    isMain: Boolean
  }],
  metals: [{
    metalType: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  sizes: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
