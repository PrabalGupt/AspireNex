// server/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  scrapeAndStoreProduct,
  getProductById,
  getAllProducts,
  getSimilarProducts,
  addUserEmailToProduct,
} = require('../controllers/productController');

// Route: GET all products
router.get('/', async (req, res) => {
  try {
    console.log('hii');
    const products = await getAllProducts();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: `Error fetching products: ${error.message}` });
  }
});

// Route: GET a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: `Error fetching product: ${error.message}` });
  }
});

// Route: GET similar products for a given product ID
router.get('/:id/similar', async (req, res) => {
  try {
    const similarProducts = await getSimilarProducts(req.params.id);
    if (!similarProducts) {
      return res.status(404).json({ message: 'Similar products not found' });
    }
    res.status(200).json(similarProducts);
  } catch (error) {
    res.status(500).json({ message: `Error fetching similar products: ${error.message}` });
  }
});

// Route: POST a new product (scrape and store)
router.post('/scrape', async (req, res) => {
  const { productUrl } = req.body;
  if (!productUrl) {
    return res.status(400).json({ message: 'Product URL is required' });
  }

  try {
    await scrapeAndStoreProduct(productUrl);
    res.status(201).json({ message: 'Product scraped and stored successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error scraping and storing product: ${error.message}` });
  }
});

// Route: POST add user email to product for notifications
router.post('/:id/add-user-email', async (req, res) => {
  const { userEmail } = req.body;
  if (!userEmail) {
    return res.status(400).json({ message: 'User email is required' });
  }

  try {
    await addUserEmailToProduct(req.params.id, userEmail);
    res.status(200).json({ message: 'User email added successfully' });
  } catch (error) {
    res.status(500).json({ message: `Error adding user email: ${error.message}` });
  }
});

module.exports = router;
