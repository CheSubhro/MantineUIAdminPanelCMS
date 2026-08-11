
import express from "express";
import {
    getAllNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} from "../controllers/notification.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ==================== Protected Notification Routes ====================
router.route("/").get(verifyJWT, getAllNotifications);
router.route("/read-all").patch(verifyJWT, markAllAsRead);
router.route("/:id/read").patch(verifyJWT, markAsRead);
router.route("/:id").delete(verifyJWT, deleteNotification);

export default router;