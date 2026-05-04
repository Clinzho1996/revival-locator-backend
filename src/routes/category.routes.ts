import express from "express";
import {
	createCategory,
	deleteCategory,
	getCategories,
	updateCategory,
} from "../controllers/category.controller";
import { authorize, protect } from "../middleware/auth";

const router = express.Router();

router.get("/", getCategories);
router.post("/", protect, authorize("admin"), createCategory);
router.put("/:id", protect, authorize("admin"), updateCategory);
router.delete("/:id", protect, authorize("admin"), deleteCategory);

export default router;
