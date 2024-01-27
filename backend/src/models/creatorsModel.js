import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
// import jwt from 'jsonwebtoken';
const creatorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your Page name!'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your page email address'],
    },
    password: {
      type: String,
      minLength: [6, 'Password should be greater than 6 characters'],
      select: false,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    withdrawMethod: {
      type: Object,
    },
    availableBalance: {
      type: Number,
      default: 0,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    transactions: [
      {
        amount: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          default: 'Processing',
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        updatedAt: {
          type: Date,
        },
      },
    ],
    subscriptionCharge: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Hash password before saving
creatorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare Password
creatorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Creator = mongoose.model('Creator', creatorSchema);

export default Creator;
