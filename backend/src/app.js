import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middlewares/Error.js';

// ROUTES: USER, PAGE, POST, WITHDRAW, SUBSCRIBE
import userRouter from './routes/userRoutes.js';
import pageRouter from './routes/pageRoutes.js';
import postRouter from './routes/postRoutes.js';
import withdrawRouter from './routes/withdrawRoutes.js';
import subscribeRouter from './routes/subscribeRoutes.js';
import notificationRouter from './routes/notificationRoutes.js';
import conversationRouter from './routes/conversationRoutes.js';
import messagesRouter from './routes/messagesRoutes.js';
const app = express();

// Configuring accepting the json
app.use(express.json({ limit: '50mb' }));

// Configuring the URL params and form data
app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb',
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
app.use('/api/v1/post', postRouter);
app.use('/api/v1/subscribe', subscribeRouter);
app.use('/api/v1/withdraw', withdrawRouter);
app.use('/api/v1/notification', notificationRouter);
app.use('/api/v1/conversation', conversationRouter)
app.use('/api/v1/messages', messagesRouter)

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
