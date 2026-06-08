const express = require('express');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Subcategory = require('../models/Subcategory');
const router = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  const filter = { isActive: true };
  
  if (req.query.category) {
    const catQuery = req.query.category.toLowerCase().trim();
    
    // 1. Check if it's a shape
    const shapes = ['round', 'emerald', 'princess', 'cushion', 'oval', 'pear', 'marquise', 'asscher', 'heart'];
    if (shapes.includes(catQuery)) {
      const capitalizedShape = catQuery.charAt(0).toUpperCase() + catQuery.slice(1);
      filter.shapes = { $in: [capitalizedShape] };
    } 
    // 2. Check if it's a main category
    else if (['rings', 'bracelets', 'earrings', 'necklaces', 'pendants', 'bracelet', 'necklace'].includes(catQuery)) {
      let mainCat = '';
      if (catQuery.startsWith('ring')) mainCat = 'Rings';
      else if (catQuery.startsWith('bracelet')) mainCat = 'Bracelets';
      else if (catQuery.startsWith('earring')) mainCat = 'Earrings';
      else if (catQuery.startsWith('necklace') || catQuery.startsWith('pendant')) mainCat = 'Necklaces';
      
      if (mainCat) {
        filter.mainCategory = mainCat;
      }
    } 
    // 3. Otherwise treat as subcategory slug
    else {
      const subcategory = await Subcategory.findOne({ slug: catQuery });
      if (subcategory) {
        filter.subCategory = subcategory._id;
      } else {
        // No subcategory found with this slug, filter by a non-existent ObjectId
        filter.subCategory = new mongoose.Types.ObjectId();
      }
    }
  }

  const products = await Product.find(filter)
    .populate('subCategory', 'name slug mainCategory')
    .sort({ createdAt: -1 });
    
  res.json(products);
}));

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('subCategory', 'name slug mainCategory');
  
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
}));

module.exports = router;
