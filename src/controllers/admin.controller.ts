import { Request, Response } from "express";
import { User, UserRole } from "../models/User";

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

export const changeUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!Object.values(UserRole).includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user role" });
  }
};