const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { protectAdmin } = require('../middleware/auth');
const router = express.Router();

// Cloudinary config is typically initialized in server.js or here
// We'll configure it dynamically via env vars
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protectAdmin, upload.fields([{ name: 'file' }, { name: 'image' }]), async (req, res) => {
  try {
    const file = req.files?.file?.[0] || req.files?.image?.[0];
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Convert buffer to base64
    const b64 = Buffer.from(file.buffer).toString('base64');
    const dataURI = "data:" + file.mimetype + ";base64," + b64;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'luxe-jewels',
    });

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

module.exports = router;
