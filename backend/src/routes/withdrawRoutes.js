import express from 'express';
import {
  isCreator,
  authorizeRoles,
  isAuthenticated,
} from '../middlewares/auth.js';
import {
  createWithdrawRequest,
  getAllWithdrawRequest,
  updateWithdrawRequest,
  deleteWithdrawRequest
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
  isAuthenticated,
  authorizeRoles('Admin'),
  getAllWithdrawRequest
);

withdrawRouter.put(
  '/update-withdraw-request/:id',
  isAuthenticated,
  authorizeRoles('Admin'),
  updateWithdrawRequest
);
withdrawRouter.delete(
  '/delete-withdraw-request',
  isAuthenticated,
  authorizeRoles('Admin'),
  deleteWithdrawRequest
);

export default withdrawRouter;
