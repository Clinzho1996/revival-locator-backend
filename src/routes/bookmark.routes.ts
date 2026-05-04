import express from "express";
import {
	getBookmarks,
	toggleBookmark,
} from "../controllers/bookmark.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/:eventId", protect, toggleBookmark);
router.get("/", protect, getBookmarks);

export default router;
