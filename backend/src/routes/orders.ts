import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
} from '../controllers/orderController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// User routes
router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);
router.get('/:id', authMiddleware, getOrderById);
router.patch('/:id/cancel', authMiddleware, cancelOrder);

// Admin routes
router.get('/admin/all', authMiddleware, adminMiddleware, getAllOrders);
router.patch('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

export default router;
