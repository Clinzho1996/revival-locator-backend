import express from "express";
import {
	changePassword,
	getProfile,
	getUserDashboard,
	updateProfile,
} from "../controllers/user.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.get("/dashboard", protect, getUserDashboard);
router.put("/change-password", protect, changePassword);

export default router;
