
import Page from "../models/Page.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// All Page Fetch
export const getAllPages = asyncHandler(async (req, res) => {
    const { search, status } = req.query;
    let query = {};

    // Search Query Handling
    if (search) {
        const searchRegex = new RegExp(search, "i");
        query.$or = [
            { title: searchRegex },
            { slug: searchRegex },
            { author: searchRegex },
        ];
    }

    // Status Filter Handling
    if (status && status !== "All") {
        query.status = status;
    }

    const pages = await Page.find(query).sort({ updatedAt: -1 });

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                pages,
                "Pages fetched successfully.",
                { count: pages.length }
            )
        );
});

// New Page Create
export const createPage = asyncHandler(async (req, res) => {
    const { title, slug, author, status, excerpt, content } = req.body;

    const currentDate = new Date().toISOString().split("T")[0];

    const newPage = await Page.create({
        title,
        slug,
        author: author || "Subhro Mondal",
        status: status || "Published",
        excerpt,
        content,
        updatedAt: currentDate,
    });

    return res
        .status(HttpStatus.CREATED || 201)
        .json(
            new ApiResponse(
                HttpStatus.CREATED || 201,
                newPage,
                "New website page added successfully."
            )
        );
});

// Page Update
export const updatePage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = {
        ...req.body,
        updatedAt: new Date().toISOString().split("T")[0],
    };

    const updatedPage = await Page.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    if (!updatedPage) {
        throw new ApiError(HttpStatus.NOT_FOUND || 404, "Page not found.");
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                updatedPage,
                "Website page details updated successfully."
            )
        );
});

// Single Page Delete
export const deletePage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedPage = await Page.findByIdAndDelete(id);

    if (!deletedPage) {
        throw new ApiError(HttpStatus.NOT_FOUND || 404, "Page not found.");
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                { id },
                "Website page has been removed successfully."
            )
        );
});

// Bulk Delete Pages
export const bulkDeletePages = asyncHandler(async (req, res) => {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "No page IDs provided for bulk deletion."
        );
    }

    const result = await Page.deleteMany({ _id: { $in: ids } });

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                { deletedIds: ids },
                `${result.deletedCount} website pages have been removed successfully.`
            )
        );
});