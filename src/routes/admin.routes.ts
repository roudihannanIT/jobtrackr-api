import { Router } from "express";
import { adminDashboard, getAllUsers } from "../controllers/admin.controller";
import { protect } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/authorize.middleware";
import { UserRole } from "../models/User";
import { changeUserRole, deleteUser } from "../controllers/admin.controller";

const router = Router();

router.get(
    '/dashboard',
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
    changeUserRole
);

router.delete(
    "/users/:userId",
    protect,
    authorizeRoles(UserRole.ADMIN),
    deleteUser
);

export default router;