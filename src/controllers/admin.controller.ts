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
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const role = req.query.role as string | undefined;

    const filter: any = {};
    if (role) {
      filter.role = role;
    }

    const [users, total] = await Promise.all([
      User.find(filter)
        .select("-password")
        .skip(skip)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    res.status(200).json({
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
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

export const deleteUser = async (req:Request,res:Response) => {
  try{
    const {userId} = req.params;

    if(req.user?.id === userId){
      return res.status(400).json({
        message: "Admin cannot delete their own account",
      });
    }

    const user = await User.findById(userId);

    if(!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
    });
  }catch(error) {
    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};