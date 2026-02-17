import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/User";

export const authorizeRoles = (...roles: UserRole[]) => {
    return (req:Request, res:Response, next: NextFunction) => {
        if(!req.user) {
            throw new Error('Not authorized');
        }

        if(!roles.includes(req.user.role)) {
            throw new Error('Forbidden');
        }

        next();
    };
};