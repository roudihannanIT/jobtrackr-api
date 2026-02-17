import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  let statusCode = 500;
  let message = 'Server Error';

  if (err.message.includes('required')) {
    statusCode = 400;
    message = err.message;
  }

  if (err.message.includes('exists')) {
    statusCode = 409;
    message = err.message;
  }

  if (err.message.includes('Invalid') || err.message.includes('authorized')) {
    statusCode = 401;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};