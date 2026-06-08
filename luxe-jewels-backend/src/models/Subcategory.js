const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  mainCategory: { 
    type: String, 
    enum: ['Rings', 'Bracelets', 'Earrings', 'Necklaces'],
    required: true 
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Compound index to ensure subcategory names are unique within a main category
subcategorySchema.index({ name: 1, mainCategory: 1 }, { unique: true });

// Pre-save hook to generate slug
subcategorySchema.pre('save', async function() {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

module.exports = mongoose.model('Subcategory', subcategorySchema);
