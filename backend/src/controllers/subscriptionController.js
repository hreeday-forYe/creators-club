import Subscription from '../models/subscriptionsModel.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import User from '../models/usersModel.js';
import Page from '../models/pagesModel.js';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import sendMail from '../utils/sendMail.js';
import dotenv from 'dotenv';
dotenv.config();
import stripePackage from 'stripe';
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

// Create SUBSCRIPTION FUNCTION  USER

export const createSubscription = asyncHandler(async (req, res, next) => {
  try {
    const { pageId, payment_info } = req.body;
    console.log(payment_info);
    if (payment_info) {
      if ('id' in payment_info) {
        const paymentIntentId = payment_info.id;
        const paymentIntent =
          await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status !== 'succeeded') {
          return next(new ErrorHandler('Payment not authorized', 400));
        }
      }
    }

    // getting the user and check if he is already subscribed
    const user = await User.findById(req.user?._id);

    // if subscribed
    const pageSubscribed = user?.subscriptions.some(
      (page) => page._id.toString() === pageId
    );

    if (pageSubscribed) {
      return next(
        new ErrorHandler('You have already subscribed to the creator', 400)
      );
    }

    // if the user is not subscribed
    const page = await Page.findById(pageId);

    if (!page) {
      return next(new ErrorHandler('Page not found', 400));
    }

    // Sending the mail to the user
    const mailData = {
      user: {
        name: user?.name,
      },
      order: {
        _id: page._id.toString().slice(0, 6),
        creatorName: page.name,
        price: page.subscriptionCharge,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      },
    };

    // getting the current directory
    const __filename = fileURLToPath(import.meta.url);
    const currentDirectory = path.dirname(__filename);

    const mailPath = path.join(
      currentDirectory,
      '../mails/subscriptionMail.ejs'
    );

    // console.log('This is the mailPath', mailPath);
    const html = await ejs.renderFile(mailPath, mailData);

    // Sending the mail to the user for his subscription
    try {
      if (user) {
        await sendMail({
          email: user.email,
          subject: 'Subscription Confirmation',
          template: 'subscriptionMail.ejs',
          data: mailData,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }

    // Updating the payment status of the subscription

    // PUSHING THE PAGE ID TO THE USER MODEL subscriptions list
    user?.subscriptions.push(page?._id);
    await user?.save();

    // pushing user id to the page model subscribers list
    page?.subscribers.push(user?._id);
    if (page && page.availableBalance !== undefined) {
      page.availableBalance +=
        page.subscriptionCharge - page.subscriptionCharge * 0.02;
    }

    await page?.save();

    //#TODO: Add notification for the creator
    // DUMMY DATA
    /* 
      await Notification.create({
        user: user?._id,
        creator: page?._id,
        title: "New subscription"
        message: "You have new Subscription from ${user?.name}"
      })
    */

    // Calculate expiry date 30 days from the startedAt date
    const startedAt = new Date();
    const thirtyDaysFromStart = new Date(startedAt);
    thirtyDaysFromStart.setDate(thirtyDaysFromStart.getDate() + 30);
    const expiryDate = thirtyDaysFromStart;

    // Format dates to human-readable form
    const startedAtFormatted = startedAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const expiryDateFormatted = expiryDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // new subscription
    const subscribe = await Subscription.create({
      subscriber: user?._id,
      creator: page?._id,
      paymentInfo: payment_info,
      totalPrice: page?.subscriptionCharge,
      startedAt: startedAtFormatted,
      expiryDate: expiryDateFormatted,
    });

    res.status(201).json({
      success: true,
      message: 'Subscription Successfull check you email for details',
      subscribe,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Get all subscriptions of user ROUTE: user-subscriptions/:userId
export const getUserSubscriptions = asyncHandler(async (req, res, next) => {
  try {
    // user subscriptions for getting the user subscriptioins in detail
    const userId = req.user._id;
    const subscriptions = await Subscription.find({ subscriber: userId })
      .populate({
        path: 'creator',
        select: 'name avatar description',
      })
      .exec();

    if (!subscriptions) {
      return res.status(404).json({
        success: false,
        message: 'No subscriptions found for this user.',
      });
    }
    res.status(200).json({
      success: true,
      message: 'User subscriptions retrieved successfully.',
      subscriptions,
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// get all subscribers for Creator ROUTE: page-subscribers/:pageId
export const getCreatorSubscriptions = asyncHandler(async (req, res, next) => {
  try {
    // Creator subscribers list of all the users who are subscribed to creators
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// cancel subscriptions for user ROUTE: /cancel-subscriptions/:subscriptionsID
export const cancelSubscriptions = asyncHandler(async (req, res, next) => {
  try {
    // LOGIC TO CANCEL THE SUBSCRIPTIONS STATUS REMOVE THE USER FROM SUBSCRIBER LIST of creator and remove the
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// GET ALL SUBSCRIPTIONS ADMIN ROUTE: /admin-all-subscriptions
export const adminAllSubscriptions = asyncHandler(async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// send stripe publishable key
export const sendStripePublishableKey = asyncHandler(async (req, res) => {
  res.status(200).json({
    publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// New Payment
export const newPayment = asyncHandler(async (req, res, next) => {
  try {
    console.log('AMOUNT:', req.body.amount);
    const user = await User.findById(req.user._id);
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'USD',
      description: 'Page subscription services',
      shipping: {
        name: user.name,
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
      metadata: {
        company: 'creators-club',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(201).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
