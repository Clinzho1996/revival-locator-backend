import express from "express";
import {
	createResource,
	deleteResource,
	getResourceById,
	getResources,
	updateResource,
} from "../controllers/resource.controller";
import { authorize, protect } from "../middleware/auth";

const router = express.Router();

router.get("/", getResources);
router.post("/", protect, authorize("admin"), createResource);
router.delete("/:id", protect, authorize("admin"), deleteResource);
router.get("/:id", protect, getResourceById);
router.put("/:id", protect, authorize("admin"), updateResource);

export default router;
