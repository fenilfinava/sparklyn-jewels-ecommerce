const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/products', require('./routes/adminProducts'));
app.use('/api/admin/upload', require('./routes/upload'));
app.use('/api/admin/subcategories', require('./routes/subcategories'));
app.use('/api/subcategories', require('./routes/subcategories'));
app.use('/api/admin/homepage', require('./routes/homepage'));
app.use('/api/homepage', require('./routes/homepage'));
app.use('/api/products', require('./routes/products'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Luxe Jewels API running' });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
