import { Request, Response, NextFunction } from 'express';
import { AppError, formatError } from '../utils/helpers.js';

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error('Error:', err);
  
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(formatError(err));
  }
  
  res.status(500).json(formatError({
    message: 'Internal Server Error',
    statusCode: 500,
  }));
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    statusCode: 404,
  });
}
