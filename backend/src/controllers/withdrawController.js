import Page from '../models/pagesModel.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import Withdraw from '../models/withdrawModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import sendMail from '../utils/sendMail.js';
import { fileURLToPath } from 'url';
import path from 'path';
import ejs from 'ejs';

// Create withdraw Request
// Only Creators Route/Controller function

export const createWithdrawRequest = asyncHandler(async (req, res, next) => {
  try {
    const amount = req.body.amount;
    // console.log('THis is amount', amount);
    const data = {
      creator: req.creator,
      amount,
    };
    // console.log(req.creator.email);
    // console.log(req.creator.name);
    // Send mail to the creator Email

    // getting the current directory
    const __filename = fileURLToPath(import.meta.url);
    const currentDirectory = path.dirname(__filename);

    const mailData = {
      user: {
        name: req.creator?.name,
      },
      withdraw: {
        creator: req.creator,
        amount: amount,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      },
    };

    const mailPath = path.join(
      currentDirectory,
      '../mails/withdrawRequestMail.ejs'
    );

    // console.log('This is the mailPath', mailPath);
    const html = await ejs.renderFile(mailPath, mailData);

    try {
      await sendMail({
        email: req.creator.email,
        subject: 'Withdraw Request',
        template: 'withdrawRequestMail.ejs',
        data: mailData,
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
    const withdraws = await Withdraw.find()
      .populate('creator', 'name _id avatar')
      .sort({ createdAt: -1 });
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
    const pageId = req.body.pageId;
    // console.log('the req body 1 ', req.body);
    // console.log('Page ID', pageId);
    // console.log('Withdraw ID', req.params.id);

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
    const creator = await Page.findById(pageId);
    const transactions = {
      _id: withdraw._id,
      amount: withdraw.amount,
      updatedAt: withdraw.updatedAt,
      status: withdraw.status,
    };
    creator.transactions = [...creator.transactions, transactions];
    await creator.save();

    // Sending the mail for payment processing email confirmation
    // getting the current directory
    const __filename = fileURLToPath(import.meta.url);
    const currentDirectory = path.dirname(__filename);

    const mailData = {
      user: {
        name: creator.name,
      },
      withdraw: {
        creator: creator,
        amount: withdraw.amount,
        date: withdraw.createdAt,
        acceptedDate: withdraw.updatedAt,
      },
    };

    const mailPath = path.join(
      currentDirectory,
      '../mails/withdrawAcceptMail.ejs'
    );

    // console.log('This is the mailPath', mailPath);
    const html = await ejs.renderFile(mailPath, mailData);

    try {
      await sendMail({
        email: creator.email,
        subject: 'Withdraw Request Accepted',
        template: 'withdrawAcceptMail.ejs',
        data: mailData,
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
