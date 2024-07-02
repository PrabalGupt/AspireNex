  // Import required modules
  const express = require('express');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const cors = require('cors');

  // Initialize Express app
  const app = express();

  // Middleware
  app.use(bodyParser.json()); // Parse incoming request bodies in JSON format
  app.use(cors(
    {
      origin: ["https://aspire-nex-frontend.vercel.app"],
      methods: ["POST", "GET"],
      credentials: true
    }
  )); // Enable CORS for all requests

  // Define routes
  const productRoutes = require('./routes/productRoutes');
  const cronRoutes = require('./routes/cronRoutes');

  // Use routes
  app.use('/api/products', productRoutes);
  app.use('/api/cron', cronRoutes);

  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
