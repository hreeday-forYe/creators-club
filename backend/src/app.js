import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoutes.js';
import pageRouter from './routes/pageRoutes.js';
import { ErrorMiddleware } from './middlewares/Error.js';
const app = express();

// Configuring accepting the json
app.use(express.json({ limit: '16kb' }));

// Configuring the URL params and form data
app.use(
  express.urlencoded({
    extended: true,
    limit: '16kb',
  })
);

// configure CORS
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

// Stroing the files and folder in public folder serves the files even clients can access
app.use(express.static('public'));

// Configuring the cookies for CRUD WITH THE USER COOKIE
app.use(cookieParser());

/* -------------------------------------------------------------------------------------------
  User Routes- ROUTES FOR ADMIN, USER AND CREATORS (REGISTER, ACTIVATION LOGIN, LOGOUT, UPDATE)
  --------------------------------------------------------------------------------------------
*/
app.use('/api/v1/user', userRouter);
app.use('/api/v1/page', pageRouter);

// TEST ROUTES
app.get('/test', (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Creators Club Working Fine',
  });
});

// configure error middleware
app.use(ErrorMiddleware);

// Unknown Routes
app.get('*', (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

export default app;
