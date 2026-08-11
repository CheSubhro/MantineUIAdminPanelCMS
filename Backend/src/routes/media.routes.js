
import { Router } from "express";
import {
    getMediaFiles,
    uploadMedia,
    deleteMedia,
} from "../controllers/media.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Apply verifyJWT middleware to all media routes to protect them
router.use(verifyJWT);

// Media Routes
router.route("/").get(getMediaFiles);
router.route("/upload").post(upload.single("file"), uploadMedia);
router.route("/:id").delete(deleteMedia);

export default router;