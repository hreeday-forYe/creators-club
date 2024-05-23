import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();
// import jwt from 'jsonwebtoken';
const pageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your Page name!'],
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter your Page Associated Email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your Password'],
      minLength: [6, 'Password should be greather than 6 characters'],
      select: false,
    },
    description: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'Creator',
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
    coverImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    withdrawMethod: {
      type: Object,
    },
    availableBalance: {
      type: Number,
      default: 0,
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
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

// HashPassword
pageSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// compare Password
pageSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Page = mongoose.model('Page', pageSchema);

export default Page;
