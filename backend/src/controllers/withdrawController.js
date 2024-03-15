import Page from '../models/pagesModel.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import Withdraw from '../models/withdrawModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import sendMail from '../utils/sendMail.js';

// Create withdraw Request
// Only Creators Route/Controller function

export const createWithdrawRequest = asyncHandler(async (req, res, next) => {
  try {
    const { amount } = req.body;
    const data = {
      creator: req.creator,
      amount,
    };

    // Send mail to the creator Email
    try {
      await sendMail({
        email: req.seller.email,
        subject: 'Withdraw Request',
        message: `Hello ${req.seller.name}, Your withdraw request of ${amount}$ is processing. It will take 3days to 7days to processing! `,
      });
      res.status(201).json({
        success: true,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    // Update the available amount from page Schema
    const withdraw = await Withdraw.create(data);
    const page = await Page.findById(req.creator._id);
    page.availableBalance = page.availableBalance - amount;
    await page.save();

    // Response after the withdraw been completed
    res.status(201).json({
      success: true,
      withdraw,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Admin route to get only the withdraw request
export const getAllWithdrawRequest = asyncHandler(async (req, res, next) => {
  try {
    const withdraws = await Withdraw.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: 'Withdraw Request Fetched',
      withdraws,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Admin route to update the withdraw request from
export const updateWithdrawRequest = asyncHandler(async (req, res, next) => {
  try {
    const { creatorId } = req.body;
    const withdraw = await Withdraw.findByIdAndUpdate(
      req.params.id,
      {
        status: 'succeed',
        updatedAt: Date.now(),
      },
      {
        new: true,
      }
    );
    const creator = await Page.findById(creatorId);
    const transactions = {
      _id: withdraw._id,
      amount: withdraw.amount,
      updatedAt: withdraw.updatedAt,
      status: withdraw.status,
    };
    creator.transactions = [...creator.transactions, transactions];
    await creator.save();

    // Sending the mail for payment processing email confirmation
    try {
      await sendMail({
        email: creator.email,
        subject: 'Payment confirmation',
        message: `Hello ${creator.name}, Your withdraw request of ${withdraw.amount}$ is on the way. Delivery time depends on your bank's rules it usually takes 3days to 7days.`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    res.status(201).json({
      success: true,
      withdraw,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
