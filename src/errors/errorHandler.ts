import { Request, Response, NextFunction } from "express";
import { AppError } from "./appError";
import { request } from "node:http";

export const globalErrorHandler = (
    err:Error,
    _req:Request,
    res:Request,
    _next:NextFunction
) => {
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    console.error(err);

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
};