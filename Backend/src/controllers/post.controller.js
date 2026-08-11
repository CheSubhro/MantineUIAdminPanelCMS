
import Post from "../models/Post.model.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/Cloudinary.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get All Posts (Search, Status, & Category Filter)
export const getAllPosts = asyncHandler(async (req, res) => {
    const { search, status, category } = req.query;
    let query = {};

    // Search Query Handling
    if (search) {
        const searchRegex = new RegExp(search, "i");
        query.$or = [
            { title: searchRegex },
            { slug: searchRegex },
            { author: searchRegex },
            { category: searchRegex },
        ];
    }

    // Status Filter Handling
    if (status && status !== "All") {
        query.status = status;
    }

    // Category Filter Handling
    if (category && category !== "All") {
        query.category = category;
    }

    const posts = await Post.find(query).sort({ updatedAt: -1 });

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                posts,
                "Posts fetched successfully.",
                { count: posts.length }
            )
        );
});

// Create New Post (Image Upload)
export const createPost = asyncHandler(async (req, res) => {
    const {
        title,
        slug,
        excerpt,
        content,
        category,
        author,
        status,
        publishDate,
    } = req.body;

    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
        if (cloudinaryResponse) {
            imageUrl = cloudinaryResponse.secure_url;
            imagePublicId = cloudinaryResponse.public_id;
        }
    }

    const currentDate = new Date().toISOString().split("T")[0];

    const newPost = await Post.create({
        title,
        slug,
        excerpt,
        content,
        category: category || "Technology",
        author: author || "Subhro Mondal",
        status: status || "Published",
        publishDate: publishDate || currentDate,
        image: imageUrl,
        imagePublicId: imagePublicId,
        updatedAt: currentDate,
    });

    return res
        .status(HttpStatus.CREATED || 201)
        .json(
            new ApiResponse(
                HttpStatus.CREATED || 201,
                newPost,
                "New blog post added successfully."
            )
        );
});

// Update Post
export const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const existingPost = await Post.findById(id);

    if (!existingPost) {
        throw new ApiError(HttpStatus.NOT_FOUND || 404, "Blog post not found.");
    }

    const updateData = {
        updatedAt: new Date().toISOString().split("T")[0],
    };

    // Update text fields
    if (req.body.title !== undefined) updateData.title = req.body.title;
    if (req.body.slug !== undefined) updateData.slug = req.body.slug;
    if (req.body.excerpt !== undefined) updateData.excerpt = req.body.excerpt;
    if (req.body.content !== undefined) updateData.content = req.body.content;
    if (req.body.category !== undefined)
        updateData.category = req.body.category;
    if (req.body.author !== undefined) updateData.author = req.body.author;
    if (req.body.status !== undefined) updateData.status = req.body.status;
    if (req.body.publishDate !== undefined)
        updateData.publishDate = req.body.publishDate;

    // NEW IMAGE Upload & Old Image Delete
    if (req.file) {
        const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

        if (!cloudinaryResponse) {
            throw new ApiError(
                HttpStatus.BAD_REQUEST || 400,
                "Failed to upload new image."
            );
        }

        if (existingPost.imagePublicId) {
            await deleteFromCloudinary(existingPost.imagePublicId);
        }

        updateData.image = cloudinaryResponse.secure_url;
        updateData.imagePublicId = cloudinaryResponse.public_id;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                updatedPost,
                "Blog post details updated successfully."
            )
        );
});

// Delete Single Post
export const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
        throw new ApiError(HttpStatus.NOT_FOUND || 404, "Blog post not found.");
    }

    if (deletedPost.imagePublicId) {
        await deleteFromCloudinary(deletedPost.imagePublicId);
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                { id },
                "Blog post has been removed successfully."
            )
        );
});

// Bulk Delete Posts (Cloudinary Image Delete)
export const bulkDeletePosts = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "No post IDs provided for bulk deletion."
        );
    }

    const postsToDelete = await Post.find({
        _id: { $in: ids },
    });

    const result = await Post.deleteMany({
        _id: { $in: ids },
    });

    // Delete images from Cloudinary
    for (const post of postsToDelete) {
        if (post.imagePublicId) {
            await deleteFromCloudinary(post.imagePublicId);
        }
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                { deletedIds: ids },
                `${result.deletedCount} blog posts have been removed successfully.`
            )
        );
});