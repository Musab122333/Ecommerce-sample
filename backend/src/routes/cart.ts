import express from 'express';

const router = express.Router();

// Cart is handled on frontend with localStorage
// This is a placeholder for future cart operations (saved carts, etc.)

router.get('/', (req, res) => {
  res.json({ message: 'Cart endpoint - Currently managed client-side' });
});

export default router;
