import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  console.error(err); // Log unexpected errors

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({ errors: [{ message: err.message }] });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ errors: [{ message: 'Not authorized' }] });
  }

  // Generic error response
  res.status(500).json({
    errors: [{ message: 'Something went wrong' }],
  });
};