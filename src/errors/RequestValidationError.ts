import { CustomError } from './CustomError';
import { ZodError } from 'zod';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ZodError) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.errors.map((err) => {
      // Handle different Zod error types
      if (err.code === 'invalid_type') {
        return {
          message: `Expected ${err.expected}, received ${err.received}`,
          field: err.path.join('.'),
        };
      }
      
      return {
        message: err.message,
        field: err.path.join('.'),
      };
    });
  }
}