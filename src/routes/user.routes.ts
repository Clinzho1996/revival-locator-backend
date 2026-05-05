import express from "express";
import {
	changePassword,
	deleteUser,
	getAllUsers,
	getProfile,
	getUserDashboard,
	updateProfile,
	updateUserRole,
} from "../controllers/user.controller";
import { authorize, protect } from "../middleware/auth";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.get("/dashboard", protect, getUserDashboard);
router.put("/change-password", protect, changePassword);
router.get("/all", protect, authorize("admin"), getAllUsers); // Get all users (admin only)
router.put("/:id/role", protect, authorize("admin"), updateUserRole); // Update user role (admin only)
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;
