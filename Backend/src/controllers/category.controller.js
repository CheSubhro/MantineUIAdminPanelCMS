
import Category from "../models/Category.model.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/Cloudinary.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get All Categories (Search, Status Filter, & Sort by updatedAt)
export const getAllCategories = asyncHandler(async (req, res) => {
    const { search, status } = req.query;
    let query = {};

    // Search Query Handling (name or slug)
    if (search) {
        const searchRegex = new RegExp(search, "i");
        query.$or = [
            { name: searchRegex },
            { slug: searchRegex },
        ];
    }

    // Status Filter Handling
    if (status && status !== "All") {
        query.status = status;
    }

    const categories = await Category.find(query).sort({ updatedAt: -1 });

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                categories,
                "Categories fetched successfully.",
                { count: categories.length }
            )
        );
});

// Create New Category (Image Upload & Duplicate Slug Check)
export const createCategory = asyncHandler(async (req, res) => {
    const { name, slug, description, status } = req.body;

    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

        if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST || 400,
                "Failed to upload image to Cloudinary due to timeout or network issue."
            );
        }

        imageUrl = cloudinaryResponse.secure_url;
        imagePublicId = cloudinaryResponse.public_id;
    } else {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "Category image is required."
        );
    }

    try {
        const newCategory = await Category.create({
            name,
            slug,
            description,
            status: status || "Active",
            postCount: 0,
            image: imageUrl,
            imagePublicId: imagePublicId,
        });

        return res
            .status(HttpStatus.CREATED || 201)
            .json(
                new ApiResponse(
                    HttpStatus.CREATED || 201,
                    newCategory,
                    "New category added successfully."
                )
            );
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST || 400,
                "Slug must be unique. This slug already exists."
            );
        }
        throw error;
    }
});

// Update Category (Optional Image Replacement & Old Image Cleanup)
export const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const existingCategory = await Category.findById(id);

    if (!existingCategory) {
        throw new ApiError(
            HttpStatus.NOT_FOUND || 404,
            "Category not found."
        );
    }

    const updateData = {};

    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.slug !== undefined) updateData.slug = req.body.slug;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.status !== undefined) updateData.status = req.body.status;

    // NEW IMAGE Upload & Old Image Delete (if new file provided)
    if (req.file) {
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

        if (!cloudinaryResponse) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST || 400,
                "Failed to upload new image. Please check your internet connection."
            );
        }

        if (existingCategory.imagePublicId) {
            await deleteFromCloudinary(existingCategory.imagePublicId);
        }

        updateData.image = cloudinaryResponse.secure_url;
        updateData.imagePublicId = cloudinaryResponse.public_id;
    }

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        return res
            .status(HttpStatus.OK || 200)
            .json(
                new ApiResponse(
                    HttpStatus.OK || 200,
                    updatedCategory,
                    "Category details updated successfully."
                )
            );
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST || 400,
                "Slug must be unique. This slug already exists."
            );
        }
        throw error;
    }
});

// Delete Single Category & Cloudinary Cleanup
export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
        throw new ApiError(
            HttpStatus.NOT_FOUND || 404,
            "Category not found."
        );
    }

    if (deletedCategory.imagePublicId) {
        await deleteFromCloudinary(deletedCategory.imagePublicId);
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                { id },
                "Category has been removed successfully."
            )
        );
});

// Bulk Delete Categories (Cloudinary Image Delete)
export const bulkDeleteCategories = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "No category IDs provided for bulk deletion."
        );
    }

    const categoriesToDelete = await Category.find({
        _id: { $in: ids },
    });

    const result = await Category.deleteMany({
        _id: { $in: ids },
    });

    // Delete images from Cloudinary sequentially (just like posts logic)
    for (const category of categoriesToDelete) {
        if (category.imagePublicId) {
            await deleteFromCloudinary(category.imagePublicId);
        }
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                { deletedIds: ids },
                `${result.deletedCount} categories have been removed successfully.`
            )
        );
});