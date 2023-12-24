import mongoose from 'mongoose';

const creatorSchema = new mongoose.Schema({}, { timestamps: true });

export const Creator = mongoose.model('Creator', creatorSchema);
