import express from "express";
import {
	createPost,
	deletePost,
	getPosts,
	replyToPost,
} from "../controllers/forum.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/", getPosts);
router.post("/", protect, createPost);
router.post("/:id/reply", protect, replyToPost);
router.delete("/:id", protect, deletePost);

export default router;
