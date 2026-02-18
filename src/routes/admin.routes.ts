import { Router } from "express";
import {
  adminDashboard,
  getAllUsers,
  changeUserRole,
  deleteUser,
} from "../controllers/admin.controller";
import { protect } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/authorize.middleware";
import { UserRole } from "../models/User";
import { validate } from "../middlewares/validate.middleware";
import {
  changeUserRoleSchema,
  deleteUserSchema,
} from "../validation/admin.validation";

const router = Router();

router.get(
  "/dashboard",
  protect,
  authorizeRoles(UserRole.ADMIN),
  adminDashboard
);

router.get(
  "/users",
  protect,
  authorizeRoles(UserRole.ADMIN),
  getAllUsers
);

router.patch(
  "/users/:userId/role",
  protect,
  authorizeRoles(UserRole.ADMIN),
  validate(changeUserRoleSchema),
  changeUserRole
);

router.delete(
  "/users/:userId",
  protect,
  authorizeRoles(UserRole.ADMIN),
  validate(deleteUserSchema),
  deleteUser
);

export default router;