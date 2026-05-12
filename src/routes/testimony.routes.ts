// routes/testimonyRoutes.ts
import express from "express";
import {
	createPublicTestimony,
	createTestimony,
	deleteTestimony,
	getPendingTestimonies, 
	getTestimonies,
	likeTestimony,
	updateTestimony,
} from "../controllers/testimony.controller";
import { authorize, protect } from "../middleware/auth";

const router = express.Router();

// Public routes (no authentication required)
router.post("/public", createPublicTestimony);
router.get("/", getTestimonies);
router.post("/:id/like", protect, likeTestimony);

// Admin only routes
router.post("/", protect, authorize("admin"), createTestimony);
router.get("/pending", protect, authorize("admin"), getPendingTestimonies);
router.put("/:id", protect, authorize("admin"), updateTestimony);
router.delete("/:id", protect, authorize("admin"), deleteTestimony);

export default router;
