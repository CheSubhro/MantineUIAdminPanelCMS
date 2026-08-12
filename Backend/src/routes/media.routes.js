
import { Router } from "express";
import {
    getMediaFiles,
    uploadMedia,
    deleteMedia,
    bulkDeleteMedia,
} from "../controllers/media.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Apply verifyJWT middleware so that only authenticated users can access media routes
router.use(verifyJWT);

// Media Routes (All logged-in users can view, upload, and delete their media)
router.route("/").get(getMediaFiles);
router.route("/upload").post(upload.single("file"), uploadMedia);
router.route("/bulk").delete(bulkDeleteMedia); 
router.route("/:id").delete(deleteMedia);

export default router;