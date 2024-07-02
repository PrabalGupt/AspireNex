
// server/utils/mongoose.js
const mongoose = require('mongoose');
const dotenv = require('dotenv')
let isConnected = false; // Variable to track the connection status


const connectToDB = async () => {
  dotenv.config();
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    console.log('MONGODB_URI is not defined');
    return;
  }

  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;
