// routes/testimonyRoutes.ts
import express from "express";
import {
	createTestimony,
	deleteTestimony,
	getPendingTestimonies,
	getTestimonies,
	likeTestimony,
	updateTestimony,
} from "../controllers/testimony.controller";
import { authorize, protect } from "../middleware/auth";

const router = express.Router();

router.post("/", protect, authorize("admin"), createTestimony);
router.get("/", getTestimonies);
router.get("/pending", protect, authorize("admin"), getPendingTestimonies);
router.put("/:id", protect, authorize("admin"), updateTestimony);
router.delete("/:id", protect, authorize("admin"), deleteTestimony);
router.post("/:id/like", protect, likeTestimony);

export default router;
