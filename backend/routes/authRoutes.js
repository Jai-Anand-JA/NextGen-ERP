import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getCurrentUser, login, logout } from '../controllers/authController.js';
const router = express.Router();

router.post('/login',login);
router.post('/logout',logout);

router.get('/profile',getCurrentUser);

export default router;
