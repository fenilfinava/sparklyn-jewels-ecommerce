const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Subcategory = require('./models/Subcategory');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();

const subcategoriesToSeed = [
  // Rings
  { name: 'Solitaire Rings', mainCategory: 'Rings' },
  { name: 'Bands', mainCategory: 'Rings' },
  { name: 'Engagement Rings', mainCategory: 'Rings' },
  { name: 'Halo Rings', mainCategory: 'Rings' },
  { name: 'Three Stone Rings', mainCategory: 'Rings' },
  
  // Earrings
  { name: 'Studs', mainCategory: 'Earrings' },
  { name: 'Halo Studs', mainCategory: 'Earrings' },
  { name: 'Diamond Hoops', mainCategory: 'Earrings' },
  
  // Necklaces
  { name: 'Solitaire Pendants', mainCategory: 'Necklaces' },
  { name: 'Halo Pendants', mainCategory: 'Necklaces' },
  
  // Bracelets
  { name: 'Tennis Bracelets', mainCategory: 'Bracelets' },
  { name: 'Chain Bracelets', mainCategory: 'Bracelets' },
  { name: 'Statement Bracelets', mainCategory: 'Bracelets' }
];

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing products and subcategories...');
    await Product.deleteMany({});
    await Subcategory.deleteMany({});
    console.log('Cleanup complete.');

    console.log('Seeding subcategories...');
    for (const sub of subcategoriesToSeed) {
      const created = new Subcategory(sub);
      await created.save();
      console.log(`Seeded Subcategory: ${sub.name} (${sub.mainCategory}) -> Slug: ${created.slug}`);
    }

    console.log('Database seeding successfully finished!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
