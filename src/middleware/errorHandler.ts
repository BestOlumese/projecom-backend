import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';
import { HTTPSTATUS } from '../config/http.config';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) : void => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      errors: err.serializeErrors(),
    });
  }

  console.error(err); // Log unexpected errors

  // Handle specific error types
  if (err.name === 'ValidationError') {
    res.status(HTTPSTATUS.BAD_REQUEST).json({ errors: [{ message: err.message }] });
  }

  if (err.name === 'UnauthorizedError') {
    res.status(HTTPSTATUS.UNAUTHORIZED).json({ errors: [{ message: 'Not authorized' }] });
  }

  // Generic error response
  res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    errors: [{ message: 'Something went wrong' }],
  });
};