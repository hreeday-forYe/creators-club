import express from 'express';
import { isUserOrCreator } from '../middlewares/auth';

const notifyRouter = express.Router();
