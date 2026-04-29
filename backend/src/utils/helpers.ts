import jwt from 'jsonwebtoken';
import { config } from './config.js';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiry,
  });
}

export function verifyToken(token: string): JWTPayload {
  return jwt.verify(token, config.jwtSecret) as JWTPayload;
}

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function formatResponse<T>(data: T, message: string = 'Success') {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}

export function formatError(error: any) {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  
  return {
    success: false,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
  };
}
