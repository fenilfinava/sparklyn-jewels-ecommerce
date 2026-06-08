const express = require('express');
const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const { protectAdmin } = require('../middleware/auth');
const router = express.Router();

// @desc    Create a product
// @route   POST /api/admin/products
// @access  Private/Admin
router.post('/', protectAdmin, asyncHandler(async (req, res) => {
  const { title, description, price, stock, mainCategory, subCategory, shapes, isActive, images, imageUrl, metals, sizes } = req.body;
  
  const product = new Product({
    title,
    description,
    price,
    stock,
    mainCategory,
    subCategory: subCategory || null,
    shapes: shapes || [],
    isActive,
    images: images && images.length > 0 ? images : (imageUrl ? [{ url: imageUrl, isMain: true }] : []),
    metals: metals || [],
    sizes: sizes || []
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
}));

module.exports = router;
