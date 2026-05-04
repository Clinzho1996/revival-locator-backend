import express from "express";
import { getAnalytics } from "../controllers/analytics.controller";
import { authorize, protect } from "../middleware/auth";

const router = express.Router();

router.get("/", protect, authorize("admin"), getAnalytics);

export default router;
