// Start of the backend code
import connectDB from './config/dbconnect.js';
import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import cloudinary from 'cloudinary';

// Cloudinary config

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.log('Err:', error);
      throw error;
    });
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at PORT: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('DataBase Connection Failed: || ', err);
  });
