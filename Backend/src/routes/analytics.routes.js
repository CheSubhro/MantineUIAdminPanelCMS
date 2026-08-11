
import express from "express";
import {
    getDashboardMetrics,
    getTrafficOverTime,
    getTrafficSources,
    getPopularPosts,
    getTopCategories,
    getActiveAuthors,
    getRecentActivity,
} from "../controllers/analytics.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ==================== Private / Protected Routes ====================

// Dashboard Metrics Endpoint
router.route("/metrics").get(verifyJWT, getDashboardMetrics);

// Traffic Over Time Endpoint
router.route("/traffic").get(verifyJWT, getTrafficOverTime);

// Traffic Sources Endpoint
router.route("/sources").get(verifyJWT, getTrafficSources);

// Popular Posts Endpoint
router.route("/popular-posts").get(verifyJWT, getPopularPosts);

// Top Categories Endpoint
router.route("/categories").get(verifyJWT, getTopCategories);

// Active Authors Endpoint
router.route("/authors").get(verifyJWT, getActiveAuthors);

// Recent Activity Endpoint
router.route("/activity").get(verifyJWT, getRecentActivity);

export default router;