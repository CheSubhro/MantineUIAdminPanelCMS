
import express from "express";
import { getSettings, updateSettings } from "../controllers/setting.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected Setting Routes
router.route("/").get(verifyJWT, getSettings);
router.route("/").put(verifyJWT, updateSettings);

export default router;