import express from 'express';
import { isCreator, authorizeRoles } from '../middlewares/auth.js';
import {
  createWithdrawRequest,
  getAllWithdrawRequest,
  updateWithdrawRequest,
} from '../controllers/withdrawController.js';

const withdrawRouter = express.Router();

// Creator Routes 
withdrawRouter.post(
  '/create-withdraw-request',
  isCreator,
  createWithdrawRequest
);

// Admin Routes
withdrawRouter.get(
  '/get-all-withdraw-request',
  isCreator,
  authorizeRoles('Admin'),
  getAllWithdrawRequest
);

withdrawRouter.put(
  '/update-withdraw-request/:id',
  isCreator,
  authorizeRoles('Admin'),
  updateWithdrawRequest
);

export default withdrawRouter