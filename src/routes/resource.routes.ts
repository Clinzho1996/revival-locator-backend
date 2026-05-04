import express from "express";
import {
	createResource,
	deleteResource,
	getResources,
} from "../controllers/resource.controller";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/", getResources);
router.post("/", protect, createResource);
router.delete("/:id", protect, deleteResource);

export default router;
