import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId, // Person who is subscribing
      ref: 'User',
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId, // Person to whom the "Subscriber is subscribing"
      ref: 'Page',
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    startedAt: {
      type: Date,
      default: Date.now(),
    },
    paymentInfo: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      type: {
        type: String,
      },
    },
    expiryDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);


// Calculate expiry date 30 days from the startedAt date
subscriptionSchema.pre('save', function (next) {
  const thirtyDaysFromStart = new Date(this.startedAt);
  thirtyDaysFromStart.setDate(thirtyDaysFromStart.getDate() + 30);
  this.expiryDate = thirtyDaysFromStart;
  next();
});



const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
