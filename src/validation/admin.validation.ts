import { z } from "zod";
import { UserRole } from "../models/User";

export const changeUserRoleSchema = z.object({
  params: z.object({
    userId: z.string().min(1, "User ID is required"),
  }),
  body: z.object({
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    userId: z.string().min(1, "User ID is required"),
  }),
});