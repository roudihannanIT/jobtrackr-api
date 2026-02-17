import { Router } from "express";
import { adminDashboard, getAllUsers } from "../controllers/admin.controller";
import { protect } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/authorize.middleware";
import { UserRole } from "../models/User";
import { changeUserRole } from "../controllers/admin.controller";

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

export default router;