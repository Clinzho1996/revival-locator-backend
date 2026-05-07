import express from "express";
import {
	createEvent,
	deleteEvent,
	getEventById,
	getEvents,
	searchEvents,
	updateEvent,
} from "../controllers/event.controller";
import { registerForEvent } from "../controllers/registration.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/", getEvents);
router.get("/search", searchEvents);
router.post("/:eventId/register", registerForEvent);
router.get("/:id", getEventById);

router.post("/", protect, createEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
