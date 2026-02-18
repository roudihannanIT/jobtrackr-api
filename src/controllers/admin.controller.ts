import { Request, Response } from "express";
import { User, UserRole } from "../models/User";
import { successResponse, errorResponse } from "../utils/response";

export const adminDashboard = (req:Request, res:Response) => {
    return successResponse(
      res,
      "Welcome admin",
      {
        user: req.user,
      }
    );
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

    return successResponse(
      res,
      "User fetched successfully",
      {
        page,
        limit,
        total,
        pages: Math.ceil(total/ limit),
        users,
      }
    );
  } catch (error) {
    return errorResponse(res, "Failed to fetch users");
  }
};

export const changeUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!Object.values(UserRole).includes(role)) {
      return errorResponse(res, "Invalid role", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    user.role = role;
    await user.save();

    return successResponse(
      res,
      "user role updated successfully",
      {
        user,
      }
    );
  } catch (error) {
    return errorResponse(
      res,
      "Failed to update user role"
    );
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (req.user?.id === userId) {
      return errorResponse(res, "Admin cannot delete their own account", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    await user.deleteOne();

    return successResponse(res, "User deleted successfully");
  } catch (error) {
    console.error(error);
    return errorResponse(res, "Failed to delete user");
  }
};