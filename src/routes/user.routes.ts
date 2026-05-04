import express from "express";
import {
	getProfile,
	getUserDashboard,
	updateProfile,
} from "../controllers/user.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);
router.get("/dashboard", protect, getUserDashboard);

export default router;
