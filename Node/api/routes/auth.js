import express from 'express';
import { singup, singin } from '../controllers/auth.js';

export const router = express.Router();

router.post('/signup', singup);

router.post('/signin', singin);
