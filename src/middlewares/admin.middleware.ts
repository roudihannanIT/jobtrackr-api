import { Request, Response, NextFunction } from "express";

export const adminOnly = (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    if(!req.user || req.user.role !== 'admin') {
        return res.status(400).json({
            message: 'Admins only',
        });
    }

    next();
};