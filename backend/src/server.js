// Start of the backend code
import connectDB from './config/dbconnect.js';
import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';

connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.log('Err:', error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at PORT: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('DataBase Connection Failed: || ', err);
  });
