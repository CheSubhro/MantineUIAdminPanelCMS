
import express from "express";
import {
    getAllPages,
    createPage,
    updatePage,
    deletePage,
    bulkDeletePages,
} from "../controllers/page.controller.js";

const router = express.Router();

// GET /api/pages & POST /api/pages 
router.route("/").get(getAllPages).post(createPage);

// DELETE /api/pages/bulk 
router.delete("/bulk", bulkDeletePages);

// PUT /api/pages/:id & DELETE /api/pages/:id - 
router.route("/:id").put(updatePage).delete(deletePage);

export default router;