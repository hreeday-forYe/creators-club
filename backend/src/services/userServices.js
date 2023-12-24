import User from '../models/usersModel.js';
import { redis } from '../config/redis.js';
// Get user by id
export const  getUserById = async (id, res) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};
