const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered'], default: 'pending' },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String },
  shippingAddress: {
    address: String,
    city: String,
    state: String,
    pin: String,
    country: String
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    title: String,
    price: Number,
    quantity: Number,
    imageUrl: String
  }],
  totalAmount: { type: Number, required: true },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
}, { timestamps: true });

// Auto-generate order number
orderSchema.pre('save', async function() {
  if (!this.orderNumber) {
    this.orderNumber = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  }
});

module.exports = mongoose.model('Order', orderSchema);
