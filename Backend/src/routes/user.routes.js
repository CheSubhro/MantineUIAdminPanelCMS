
import express from "express";
import {
    getAllUsers,
    updateUser,
    deleteUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Get all users
router.route("/").get(verifyJWT, getAllUsers);

// Update a user (with image upload support) & Delete a user by ID
router
    .route("/:id")
    .put(
        verifyJWT,
        upload.fields([
            { name: "avatar", maxCount: 1 },
            { name: "coverImage", maxCount: 1 },
        ]),
        updateUser
    )
    .patch(
        verifyJWT,
        upload.fields([
            { name: "avatar", maxCount: 1 },
            { name: "coverImage", maxCount: 1 },
        ]),
        updateUser
    )
    .delete(verifyJWT, deleteUser);

export default router;