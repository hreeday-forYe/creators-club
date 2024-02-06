import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId, // Person who is subscribing
      ref: 'User',
      required: true
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId, // Person to whom the "Subscriber is subscribing"
      ref: 'Page',
    },
  },
  { timestamps: true }
);

const bookingSchema = new mongoose.Schema({
  booker:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  vehicle:{

  }
})

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
