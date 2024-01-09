import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId, // Person who is subscribing
      ref: 'User',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId, // Person to whom the "Subscriber is subscribing"
      ref: 'Creator',
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
