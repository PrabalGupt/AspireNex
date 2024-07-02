// server/controllers/productController.js
import { findOne, findOneAndUpdate, find, findById } from '../models/productModel';
import connectToDB from '../utils/mongoose';
import { scrapeAmazonProduct } from '../utils/scraper';
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utils/utils';
import { generateEmailBody, sendEmail } from '../utils/nodemailer';

const scrapeAndStoreProduct = async (productUrl) => {
  if (!productUrl) return;

  try {
    connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await findOne({ url: scrapedProduct.url });

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

    const newProduct = await findOneAndUpdate(
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

    const product = await findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async () => {
  connectToDB();
  try {
    const products = await find();
    return products;
  } catch (error) {
    console.log("Error in fetching products", error);
  }
};

const getSimilarProducts = async (productId) => {
  try {
    connectToDB();

    const currentProduct = await findById(productId);

    if (!currentProduct) return null;

    const similarProducts = await find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
};

const addUserEmailToProduct = async (productId, userEmail) => {
  try {
    const product = await findById(productId);
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

export default {
  scrapeAndStoreProduct,
  getProductById,
  getAllProducts,
  getSimilarProducts,
  addUserEmailToProduct,
};
