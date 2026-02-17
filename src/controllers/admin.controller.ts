import { Request, Response } from "express";
import { User } from "../models/User";

export const adminDashboard = (req:Request, res:Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome admin',
        user:req.user,
    });
};

export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const users = await User.find().select("-password");

        res.status(200).json({
            count: users.length,
            users,
        });
    }catch(error){
        res.status(500).json({
            message: "Failed to fetch users"
        });
    }
};