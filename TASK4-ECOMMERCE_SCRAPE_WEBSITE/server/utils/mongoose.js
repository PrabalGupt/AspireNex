
// server/utils/mongoose.js
import { set, connect } from 'mongoose';
import { config } from 'dotenv';
let isConnected = false; // Variable to track the connection status


const connectToDB = async () => {
  config();
  set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    console.log('MONGODB_URI is not defined');
    return;
  }

  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    await connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
