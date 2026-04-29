import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware, adminMiddleware);

// Dashboard stats
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Admin dashboard stats' });
});

// Users management
router.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// Products management - already handled in products route
// Orders management - already handled in orders route

// Analytics
router.get('/analytics/sales', (req, res) => {
  res.json({ message: 'Sales analytics' });
});

router.get('/analytics/traffic', (req, res) => {
  res.json({ message: 'Traffic analytics' });
});

export default router;
