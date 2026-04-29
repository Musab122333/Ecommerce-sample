import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { AppError, generateToken, formatResponse } from '../utils/helpers.js';
import { AuthRequest } from '../middleware/auth.js';

const prisma = new PrismaClient();

export async function register(req: AuthRequest, res: Response) {
  try {
    const { email, name, password } = req.body;
    
    if (!email || !name || !password) {
      throw new AppError('Missing required fields', 400);
    }
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError('User already exists', 409);
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'CUSTOMER',
      },
    });
    
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    
    res.status(201).json(formatResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
      'User registered successfully',
    ));
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
}

export async function login(req: AuthRequest, res: Response) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      throw new AppError('Email and password required', 400);
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }
    
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    
    res.json(formatResponse(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
      'Login successful',
    ));
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Login failed' });
    }
  }
}

export async function me(req: AuthRequest, res: Response) {
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }
    
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    });
    
    res.json(formatResponse(user));
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  }
}
