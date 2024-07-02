import Product from '../models/productModel.js';
import connectToDB from '../utils/mongoose.js';
import { scrapeAmazonProduct } from '../utils/scraper.js';
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utils/utils.js';
import { generateEmailBody, sendEmail } from '../utils/nodemailer/index.js';

// Define constants for cron job configuration
export const maxDuration = 300; // Maximum duration for each execution
export const dynamic = "force-dynamic"; // Dynamic configuration if needed
export const revalidate = 0; // Revalidation period

// Function to execute on cron job trigger
export async function executeCronJob() {
  try {
    connectToDB(); // Connect to MongoDB

    const products = await Product.find({}); // Fetch all products = require the database

    if (!products) throw new Error("No products fetched");

    // Iterate over each product to update details and send notifications
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        // Scrape latest details = require the product URL
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) return;

        // Update price history and other details
        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        // Update or insert the updated product details into the database
        const updatedProduct = await Product.findOneAndUpdate(
          { url: product.url },
          product,
          { upsert: true, new: true }
        );

        // Check product status and send email notifications if necessary
        const emailNotifType = getEmailNotifType(scrapedProduct, currentProduct);

        if (emailNotifType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };

          // Generate email content based on notification type
          const emailContent = await generateEmailBody(productInfo, emailNotifType);

          // Extract user emails and send the email notification
          const userEmails = updatedProduct.users.map((user) => user.email);
          await sendEmail(emailContent, userEmails);
        }

        return updatedProduct;
      })
    );

    // Return updated products as JSON response
    return {
      message: "Ok",
      data: updatedProducts,
    };
  } catch (error) {
    throw new Error(`Failed to execute cron job: ${error.message}`);
  }
}
