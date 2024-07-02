// server/routes/cronRoutes.js
import { Router } from 'express';
const router = Router();
import { getLowestPrice, getHighestPrice, getAveragePrice, getEmailNotifType } from '../utils/utils.js';
import connectToDB from '../utils/mongoose.js';
import { find, findOneAndUpdate } from '../models/productModel.js';
import scrapeAmazonProduct from '../utils/scraper.js';
import { generateEmailBody, sendEmail } from '../utils/nodemailer.js';

router.get('/cron', async (req, res) => {
  try {
    await connectToDB();

    const products = await find({});
    if (!products) throw new Error('No products found');

    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) return;

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          {
            price: scrapedProduct.currentPrice,
          },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        const updatedProduct = await findOneAndUpdate(
          { url: product.url },
          product
        );

        const emailNotifType = getEmailNotifType(scrapedProduct, currentProduct);

        if (emailNotifType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };

          const emailContent = await generateEmailBody(productInfo, emailNotifType);
          const userEmails = updatedProduct.users.map((user) => user.email);

          await sendEmail(emailContent, userEmails);
        }

        return updatedProduct;
      })
    );

    res.status(200).json({
      message: 'Ok',
      data: updatedProducts,
    });
  } catch (error) {
    res.status(500).json({ message: `Failed to get all products: ${error.message}` });
  }
});

export default router;
