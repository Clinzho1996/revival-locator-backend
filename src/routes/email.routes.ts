import express from "express";
import { contactOrganizer } from "../controllers/email.controller";

const router = express.Router();

router.post("/contact", contactOrganizer);

export default router;
