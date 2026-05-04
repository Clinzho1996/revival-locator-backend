import express from "express";
import { getMessages, sendMessage } from "../controllers/chat.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/:eventId", getMessages);

export default router;
