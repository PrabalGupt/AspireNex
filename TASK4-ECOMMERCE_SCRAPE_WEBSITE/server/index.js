// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: ["https://aspire-nex-frontend.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true
}));
// https://aspire-nex-frontend.vercel.app
// res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
// res.header('Access-Control-Allow-Headers', 'Content-Type');

app.use(express.json()); // Parse incoming request bodies in JSON format
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
const productRoutes = require('./routes/productRoutes');
const cronRoutes = require('./routes/cronRoutes');

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/cron', cronRoutes);

app.get('/', async (req, res) => {
  try {
    res.send("Connected")
    console.log("connected")
  } catch (error) {
    res.status(500).json({ message: `Error fetching products: ${error.message}` });
  }
})
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
