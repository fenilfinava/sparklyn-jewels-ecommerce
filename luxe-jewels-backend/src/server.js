require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to Database asynchronously without crashing the process
connectDB().catch(err => {
  console.error('Database connection failed on startup:', err.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
