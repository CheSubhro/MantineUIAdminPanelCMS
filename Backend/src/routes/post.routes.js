
import express from "express";
import {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    bulkDeletePosts,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ==================== Public Routes ====================
router.route("/").get(getAllPosts);

// ==================== Private / Protected Routes ====================
router.route("/").post(verifyJWT, upload.single("image"), createPost);

router.route("/bulk").delete(verifyJWT, bulkDeletePosts);

router
    .route("/:id")
    .put(verifyJWT, upload.single("image"), updatePost)
    .delete(verifyJWT, deletePost);

export default router;