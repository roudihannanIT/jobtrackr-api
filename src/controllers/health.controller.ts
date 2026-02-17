import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";

export const healthCheck = asyncHandler(
    async(_req:Request, res:Response) => {
        res.status(200).json({status: "OK"});
    }
);