const express = require('express');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await AdminUser.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      email: admin.email,
      name: admin.name,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
}));

module.exports = router;
