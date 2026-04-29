import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AppError, formatResponse } from '../utils/helpers.js';
import { AuthRequest } from '../middleware/auth.js';

const prisma = new PrismaClient();

export async function getProducts(req: AuthRequest, res: Response) {
  try {
    const { category, skip = 0, take = 12, search, sort } = req.query;
    
    const where: any = {};
    
    if (category) where.category = String(category);
    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } },
      ];
    }
    
    const orderBy: any = {};
    switch (sort) {
      case 'price-asc':
        orderBy.price = 'asc';
        break;
      case 'price-desc':
        orderBy.price = 'desc';
        break;
      case 'newest':
        orderBy.createdAt = 'desc';
        break;
      case 'rating':
        orderBy.rating = 'desc';
        break;
      default:
        orderBy.createdAt = 'desc';
    }
    
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: parseInt(String(skip)),
        take: parseInt(String(take)),
      }),
      prisma.product.count({ where }),
    ]);
    
    res.json(formatResponse(
      { products, total, pages: Math.ceil(total / parseInt(String(take))) },
      'Products retrieved successfully',
    ));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}

export async function getProductById(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        reviews: { include: { user: { select: { id: true, name: true, avatar: true } } } },
      },
    });
    
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    
    res.json(formatResponse(product));
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }
}

export async function createProduct(req: AuthRequest, res: Response) {
  try {
    const { name, slug, description, price, originalPrice, image, images, category, badge, quantity } = req.body;
    
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        originalPrice,
        image,
        images: images || [],
        category,
        badge,
        quantity,
        inStock: quantity > 0,
      },
    });
    
    res.status(201).json(formatResponse(product, 'Product created successfully'));
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to create product' });
  }
}

export async function updateProduct(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...updates,
        inStock: updates.quantity ? updates.quantity > 0 : undefined,
      },
    });
    
    res.json(formatResponse(product, 'Product updated successfully'));
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to update product' });
  }
}

export async function deleteProduct(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    
    await prisma.product.delete({ where: { id } });
    
    res.json(formatResponse(null, 'Product deleted successfully'));
  } catch (error: any) {
    res.status(400).json({ error: error.message || 'Failed to delete product' });
  }
}

export async function getCategories(req: AuthRequest, res: Response) {
  try {
    const categories = await prisma.product.findMany({
      distinct: ['category'],
      select: { category: true },
    });
    
    res.json(formatResponse(categories.map(c => c.category)));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
