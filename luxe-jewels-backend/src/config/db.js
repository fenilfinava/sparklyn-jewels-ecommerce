const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      tlsAllowInvalidCertificates: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('error', err => {
      console.error('MongoDB runtime connection error (ignored):', err.message);
    });
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Do not call process.exit(1) here to allow the Express server to continue running
  }
};

module.exports = connectDB;
