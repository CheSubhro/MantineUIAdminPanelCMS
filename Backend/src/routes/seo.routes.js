
import express from "express";
import {
    getSeoSettings,
    updateSeoSettings,
} from "../controllers/seo.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected SEO Routes
router.route("/").get(verifyJWT, getSeoSettings);
router.route("/").put(verifyJWT, updateSeoSettings);

export default router;