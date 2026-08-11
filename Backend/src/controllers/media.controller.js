
import Media from "../models/Media.model.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/Cloudinary.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get All Media Files (Sorted by newest first)
export const getMediaFiles = asyncHandler(async (req, res) => {
    const mediaFiles = await Media.find().sort({ createdAt: -1 });

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                mediaFiles,
                "Media files fetched successfully.",
                { count: mediaFiles.length }
            )
        );
});

// Upload Media (Cloudinary Integration & Save to MongoDB)
export const uploadMedia = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "No file provided for upload."
        );
    }

    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

    if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "Failed to upload media to Cloudinary due to timeout or network issue."
        );
    }

    const uploaderId = req.user?._id || req.body.uploadedBy;

    if (!uploaderId) {
        throw new ApiError(
            HttpStatus.UNAUTHORIZED || 401,
            "Unauthorized request. Uploader reference is missing."
        );
    }

    const newMedia = await Media.create({
        name: req.file.originalname,
        url: cloudinaryResponse.secure_url,
        size: req.file.size,
        publicId: cloudinaryResponse.public_id,
        uploadedBy: uploaderId,
    });

    return res
        .status(HttpStatus.CREATED || 201)
        .json(
            new ApiResponse(
                HttpStatus.CREATED || 201,
                newMedia,
                "Media uploaded successfully."
            )
        );
});

// Delete Single Media File (MongoDB & Cloudinary Cleanup)
export const deleteMedia = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const media = await Media.findById(id);

    if (!media) {
        throw new ApiError(
            HttpStatus.NOT_FOUND || 404,
            "Media file not found."
        );
    }

    if (media.publicId) {
        await deleteFromCloudinary(media.publicId);
    }

    await Media.findByIdAndDelete(id);

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                { id },
                "Media file has been removed successfully."
            )
        );
});

// Bulk Delete Media Files (Sequential Cloudinary Cleanup)
export const bulkDeleteMedia = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "No media IDs provided for bulk deletion."
        );
    }

    const mediaToDelete = await Media.find({
        _id: { $in: ids },
    });

    const result = await Media.deleteMany({
        _id: { $in: ids },
    });

    // Delete images from Cloudinary sequentially to avoid timeout/rate-limit
    for (const media of mediaToDelete) {
        if (media.publicId) {
            await deleteFromCloudinary(media.publicId);
        }
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                { deletedIds: ids },
                `${result.deletedCount} media files have been removed successfully.`
            )
        );
});