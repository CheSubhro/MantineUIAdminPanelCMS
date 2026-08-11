
import express from "express";
import { getSystemReports } from "../controllers/report.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected Report Route
router.route("/").get(verifyJWT, getSystemReports);

export default router;