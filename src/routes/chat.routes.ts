import express from "express";
import {
	getMessages,
	reactToMessage,
	sendMessage,
} from "../controllers/chat.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/", protect, sendMessage);
router.post("/:messageId/react", protect, reactToMessage);
router.get("/:eventId", getMessages);

export default router;
