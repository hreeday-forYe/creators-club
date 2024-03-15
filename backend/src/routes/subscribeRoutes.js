import express from 'express';
import { isCreator, authorizeRoles } from '../middlewares/auth.js';
import {
  createWithdrawRequest,
  getAllWithdrawRequest,
  updateWithdrawRequest,
} from '../controllers/withdrawController.js';

const subscribeRouter = express.Router();

// Creator Routes
subscribeRouter.post(
  '/create-withdraw-request',
  isCreator,
  createWithdrawRequest
);

// Admin Routes
subscribeRouter.get(
  '/get-all-withdraw-request',
  isCreator,
  authorizeRoles('Admin'),
  getAllWithdrawRequest
);

subscribeRouter.put(
  '/update-withdraw-request/:id',
  isCreator,
  authorizeRoles('Admin'),
  updateWithdrawRequest
);

export default subscribeRouter;
