import { Response } from 'express';
import { PrismaClient, OrderStatus } from '@prisma/client';
import { AppError, formatResponse } from '../utils/helpers.js';
import { AuthRequest } from '../middleware/auth.js';

const prisma = new PrismaClient();

export async function createOrder(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }
    
    const { items, shippingAddressId, billingAddressId, subtotal, shipping, tax } = req.body;
    
    if (!items || items.length === 0) {
      throw new AppError('Order must contain items', 400);
    }
    
    const total = subtotal + shipping + tax;
    
    const order = await prisma.order.create({
      data: {
        userId: req.user.userId,
        subtotal,
        shipping,
        tax,
        total,
        shippingAddressId,
        billingAddressId,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });
    
    res.status(201).json(formatResponse(order, 'Order created successfully'));
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create order' });
    }
  }
}

export async function getOrders(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }
    
    const orders = await prisma.order.findMany({
      where: { userId: req.user.userId },
      include: {
        items: { include: { product: true } },
        shippingAddress: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    
    res.json(formatResponse(orders));
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }
}

export async function getOrderById(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }
    
    const { id } = req.params;
    
    const order = await prisma.order.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
      include: {
        items: { include: { product: true } },
        shippingAddress: true,
        billingAddress: true,
      },
    });
    
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    
    res.json(formatResponse(order));
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  }
}

export async function updateOrderStatus(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses: OrderStatus[] = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];
    
    if (!validStatuses.includes(status)) {
      throw new AppError('Invalid order status', 400);
    }
    
    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });
    
    res.json(formatResponse(order, 'Order status updated'));
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update order' });
    }
  }
}

export async function cancelOrder(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }
    
    const { id } = req.params;
    
    const order = await prisma.order.findFirst({
      where: { id, userId: req.user.userId },
    });
    
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    
    if (order.status !== 'PENDING' && order.status !== 'CONFIRMED') {
      throw new AppError('Cannot cancel this order', 400);
    }
    
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status: 'CANCELLED' },
    });
    
    res.json(formatResponse(updatedOrder, 'Order cancelled successfully'));
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to cancel order' });
    }
  }
}

// Admin functions
export async function getAllOrders(req: AuthRequest, res: Response) {
  try {
    const { status, skip = 0, take = 20 } = req.query;
    
    const where: any = {};
    if (status) where.status = String(status);
    
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: { items: true, user: true },
        skip: parseInt(String(skip)),
        take: parseInt(String(take)),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.order.count({ where }),
    ]);
    
    res.json(formatResponse({ orders, total }));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
