const express = require('express');
const asyncHandler = require('express-async-handler');
const Subcategory = require('../models/Subcategory');
const { protectAdmin } = require('../middleware/auth');
const router = express.Router();

// @desc    Get all active subcategories
// @route   GET /api/subcategories
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  const filter = { isActive: true };
  if (req.query.mainCategory) {
    filter.mainCategory = req.query.mainCategory;
  }
  const subcategories = await Subcategory.find(filter).sort({ name: 1 });
  res.json(subcategories);
}));

// @desc    Get all subcategories (including inactive) for Admin
// @route   GET /api/admin/subcategories
// @access  Private/Admin
router.get('/admin-list', protectAdmin, asyncHandler(async (req, res) => {
  const subcategories = await Subcategory.find({}).sort({ mainCategory: 1, name: 1 });
  res.json(subcategories);
}));

// @desc    Create a subcategory
// @route   POST /api/admin/subcategories
// @access  Private/Admin
router.post('/', protectAdmin, asyncHandler(async (req, res) => {
  const { name, mainCategory } = req.body;
  if (!name || !mainCategory) {
    res.status(400);
    throw new Error('Name and Main Category are required');
  }

  // Check if exists
  const exists = await Subcategory.findOne({ 
    name: { $regex: new RegExp(`^${name}$`, 'i') }, 
    mainCategory 
  });
  if (exists) {
    res.status(400);
    throw new Error('Subcategory already exists under this main category');
  }

  const subcategory = new Subcategory({
    name,
    mainCategory
  });

  const created = await subcategory.save();
  res.status(201).json(created);
}));

// @desc    Update a subcategory
// @route   PUT /api/admin/subcategories/:id
// @access  Private/Admin
router.put('/:id', protectAdmin, asyncHandler(async (req, res) => {
  const { name, mainCategory, isActive } = req.body;
  const subcategory = await Subcategory.findById(req.params.id);

  if (!subcategory) {
    res.status(404);
    throw new Error('Subcategory not found');
  }

  if (name !== undefined) subcategory.name = name;
  if (mainCategory !== undefined) subcategory.mainCategory = mainCategory;
  if (isActive !== undefined) subcategory.isActive = isActive;

  const updated = await subcategory.save();
  res.json(updated);
}));

// @desc    Delete a subcategory
// @route   DELETE /api/admin/subcategories/:id
// @access  Private/Admin
router.delete('/:id', protectAdmin, asyncHandler(async (req, res) => {
  const subcategory = await Subcategory.findById(req.params.id);

  if (!subcategory) {
    res.status(404);
    throw new Error('Subcategory not found');
  }

  await subcategory.deleteOne();
  res.json({ message: 'Subcategory removed successfully' });
}));

module.exports = router;
