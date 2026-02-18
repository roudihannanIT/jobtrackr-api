import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error{
  statusCode?:number;
}

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  const statusCode = err.statusCode ?? 500;
  const message = err.message || "Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};