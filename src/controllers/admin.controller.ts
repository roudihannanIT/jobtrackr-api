import { Request, Response } from "express";
import { User, UserRole } from "../models/User";
import {AuditLog, AuditAction } from "../models/AuditLog";
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
    throw {statusCode: 500, message: "Failed to fetch users"};
  }
};

export const changeUserRole = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!Object.values(UserRole).includes(role)) {
      throw {statusCode: 400, message: "Invalid role"};
    }

    const user = await User.findById(userId);

    if (!user) {
      throw {statusCode: 404, message: "User not found"};
    }

    user.role = role;
    await user.save();

    await AuditLog.create({
      action: AuditAction.CHANGE_ROLE,
      performedBy: req.user!.id,
      targetUser: user.id,
    });

    return successResponse(
      res,
      "user role updated successfully",
      {
        user,
      }
    );
  } catch (error) {
    throw {statusCode: 500, message: "Failed to update user role"};
  }
};

export const deleteUser = async (req:Request,res:Response) => {
  try{
    const {userId} = req.params;

    if(req.user?.id === userId){
      throw {statusCode: 400, message: "Admin cannot delete their own account"};
    }
    const user = await User.findById(userId);

    if(!user) {
      throw {statusCode: 404, message: "User not found"};
    }

    await user.deleteOne();

    await AuditLog.create({
      action: AuditAction.DELETE_USER,
      performedBy: req.user!.id,
      targetUser: user.id,
    });

    return successResponse(res, "User deleted successfully");
  }catch(error) {
    throw {statusCode: 500, message: "Failed to delete user"};
  }
};

export const getAuditLogs = async (req: Request, res: Response) => {
  try {
    const logs = await AuditLog.find()
      .populate("performedBy", "email role")
      .populate("targetUser", "email role")
      .sort({ createdAt: -1 });

    return successResponse(
      res,
      "Audit logs fetched successfully",
      {
        count: logs.length,
        logs
      }
    );
  } catch (error) {
    throw {statusCode: 500, message: "Failed to fetch audit logs"};
  }
};