const express = require('express');
const asyncHandler = require('express-async-handler');
const Homepage = require('../models/Homepage');
const { protectAdmin } = require('../middleware/auth');
const router = express.Router();

// @desc    Get homepage configuration
// @route   GET /api/homepage
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  let config = await Homepage.findOne({});
  if (!config) {
    // Return default configurations
    config = {
      heroTitle: 'Engagement Rings',
      heroSubtitle: 'Lab Grown - IGI Certified',
      heroImage: '/hero-bg.png',
      heroButtonText: 'Shop Now',
      heroButtonLink: '/collections/engagement-rings'
    };
  }
  res.json(config);
}));

// @desc    Create or update homepage configuration
// @route   POST /api/admin/homepage
// @access  Private/Admin
router.post('/', protectAdmin, asyncHandler(async (req, res) => {
  const { heroTitle, heroSubtitle, heroImage, heroButtonText, heroButtonLink } = req.body;

  let config = await Homepage.findOne({});
  if (config) {
    if (heroTitle !== undefined) config.heroTitle = heroTitle;
    if (heroSubtitle !== undefined) config.heroSubtitle = heroSubtitle;
    if (heroImage !== undefined) config.heroImage = heroImage;
    if (heroButtonText !== undefined) config.heroButtonText = heroButtonText;
    if (heroButtonLink !== undefined) config.heroButtonLink = heroButtonLink;
    await config.save();
  } else {
    config = new Homepage({
      heroTitle,
      heroSubtitle,
      heroImage,
      heroButtonText,
      heroButtonLink
    });
    await config.save();
  }

  res.json(config);
}));

module.exports = router;
