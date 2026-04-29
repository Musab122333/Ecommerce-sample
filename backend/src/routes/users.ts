import express from 'express';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// User profile routes
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'User profile endpoint' });
});

router.patch('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Update user profile endpoint' });
});

// Wishlist routes
router.get('/wishlist', authMiddleware, (req, res) => {
  res.json({ message: 'Get wishlist endpoint' });
});

router.post('/wishlist/:productId', authMiddleware, (req, res) => {
  res.json({ message: 'Add to wishlist endpoint' });
});

router.delete('/wishlist/:productId', authMiddleware, (req, res) => {
  res.json({ message: 'Remove from wishlist endpoint' });
});

export default router;
