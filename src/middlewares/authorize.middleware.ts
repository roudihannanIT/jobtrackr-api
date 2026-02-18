import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/User";

export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next({statuscode: 401, message: "Not authorized"});
    }

    if (!roles.includes(req.user.role)) {
      return next({statusCode: 403, message: "Forbidden"});
    }

    next();
  };
};