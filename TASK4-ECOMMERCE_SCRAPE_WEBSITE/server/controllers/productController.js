// server/controllers/productController.js
const Product = require('../models/productModel');
const connectToDB = require('../utils/mongoose');
const {scrapeAmazonProduct} = require('../utils/scraper');
const { getAveragePrice, getHighestPrice, getLowestPrice } = require('../utils/utils');
const { generateEmailBody, sendEmail } = require('../utils/nodemailer');

const scrapeAndStoreProduct = async (productUrl) => {
  if (!productUrl) return;

  try {
    connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice }
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    // Implement your own revalidate function if needed
    // revalidatePath(`/products/${newProduct._id}`);
  } catch (error) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
};

const getProductById = async (productId) => {
  try {
    connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log("Error in fetching products", error);
  }
};

const getSimilarProducts = async (productId) => {
  try {
    connectToDB();

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
};

const addUserEmailToProduct = async (productId, userEmail) => {
  try {
    const product = await Product.findById(productId);
    console.log(product);
    if (!product) return;

    const userExists = product.users.some((user) => user.email === userEmail);

    // if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailBody(product, 'WELCOME');

      await sendEmail(emailContent, [userEmail]);
      return 
    // }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  scrapeAndStoreProduct,
  getProductById,
  getAllProducts,
  getSimilarProducts,
  addUserEmailToProduct,
};
