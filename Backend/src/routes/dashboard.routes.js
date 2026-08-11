
import express from "express";
import { getDashboardMetrics } from "../controllers/dashboard.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get Dashboard Metrics & Analytics (Protected Route)
router.route("/metrics").get(verifyJWT, getDashboardMetrics);

export default router;