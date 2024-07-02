// Import required modules
import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

// Initialize Express app
const app = express();

// Middleware
// app.use(cors({
//   origin: ["https://aspire-nex-frontend.vercel.app"],
//   methods: ["POST", "GET"],
//   credentials: true
// }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://aspire-nex-frontend.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(json()); // Parse incoming request bodies in JSON format
app.use(urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
import productRoutes from './routes/productRoutes.js';
import cronRoutes from './routes/cronRoutes.js';

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
