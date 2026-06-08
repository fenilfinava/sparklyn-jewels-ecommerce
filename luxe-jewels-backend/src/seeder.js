const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const AdminUser = require('./models/AdminUser');
const connectDB = require('./config/db');

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();
    
    // Clear existing
    await AdminUser.deleteMany();

    const passwordHash = await bcrypt.hash('admin', 10);
    
    await AdminUser.create({
      email: 'admin@example.com',
      passwordHash,
      name: 'Super Admin'
    });

    console.log('Admin user seeded!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
