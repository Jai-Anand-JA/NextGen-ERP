import express from 'express';
import { checkAuth, getCurrentUser, login, logout } from '../controllers/authController.js';
const router = express.Router();

router.post('/login',login);
router.post('/logout',logout);
router.get('/check-auth', checkAuth);
router.get('/profile',getCurrentUser);

export default router;
