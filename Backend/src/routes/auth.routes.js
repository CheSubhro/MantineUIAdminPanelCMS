
import { Router } from "express";
import {
    register,
    login,
    getProfile,
    updateProfile,
    deleteAccount,
    logout,
    refreshAccessToken
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// ==================== Public Routes ====================
router.post(
    "/register",
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    register
);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

// ==================== Private / Protected Routes ====================
// (Protected with verifyJWT middleware)
router.get("/profile", verifyJWT, getProfile);
router.put(
    "/update",
    verifyJWT,
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 },
    ]),
    updateProfile
);
router.delete("/delete", verifyJWT, deleteAccount);
router.post("/logout", verifyJWT, logout);

export default router;