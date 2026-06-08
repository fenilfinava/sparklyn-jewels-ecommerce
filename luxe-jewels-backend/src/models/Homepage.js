const mongoose = require('mongoose');

const homepageSchema = new mongoose.Schema({
  heroTitle: { type: String, default: 'Engagement Rings' },
  heroSubtitle: { type: String, default: 'Lab Grown - IGI Certified' },
  heroImage: { type: String, default: '/hero-bg.png' },
  heroButtonText: { type: String, default: 'Shop Now' },
  heroButtonLink: { type: String, default: '/collections/engagement-rings' },
}, { timestamps: true });

module.exports = mongoose.model('Homepage', homepageSchema);
