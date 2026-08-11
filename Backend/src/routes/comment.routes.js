
import express from "express";
import {
    getAllComments,
    createComment,
    updateCommentStatus,
    deleteComment,
    bulkDeleteComments,
    sendReply,
} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ==================== Public Routes ====================
router.route("/").get(getAllComments).post(createComment);

// ==================== Private / Protected Routes ====================

// Bulk delete comments (Admin route)
router.route("/bulk").delete(verifyJWT, bulkDeleteComments);

// Update comment status (Approve/Spam), Reply, & Delete single comment (Admin/Protected routes)
router
    .route("/:id")
    .patch(verifyJWT, updateCommentStatus) 
    .post(verifyJWT, sendReply)               
    .delete(verifyJWT, deleteComment);  

export default router;