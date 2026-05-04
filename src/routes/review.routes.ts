import express from "express";
import {
	createReview,
	deleteReview,
	getReviewsByEvent,
} from "../controllers/review.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/:eventId", getReviewsByEvent);
router.delete("/:id", protect, deleteReview);

export default router;
