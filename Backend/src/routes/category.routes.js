
import express from "express";
import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    bulkDeleteCategories,
} from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; 
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ==================== Public Routes ====================
router.route("/").get(getAllCategories);

// ==================== Private / Protected Routes ====================
// Create New Category (with image upload & verifyJWT)
router.route("/").post(verifyJWT, upload.single("image"), createCategory);

// Bulk Delete Categories (Note: Keep this before /:id to prevent routing collision)
router.route("/bulk").delete(verifyJWT, bulkDeleteCategories);

// Update Category & Delete Single Category by ID
router
    .route("/:id")
    .put(verifyJWT, upload.single("image"), updateCategory)
    .patch(verifyJWT, upload.single("image"), updateCategory)
    .delete(verifyJWT, deleteCategory);

export default router;