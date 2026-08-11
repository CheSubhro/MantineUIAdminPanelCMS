
import Comment from "../models/Comment.model.js";
import sendEmail from "../utils/Email.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get All Comments (with Search & Status Filter)
export const getAllComments = asyncHandler(async (req, res) => {
    const { search, status } = req.query;
    let query = {};

    if (search) {
        const searchRegex = new RegExp(search, "i");
        query.$or = [
            { author: searchRegex },
            { content: searchRegex },
            { postTitle: searchRegex },
        ];
    }

    if (status && status !== "All") {
        query.status = status;
    }

    const comments = await Comment.find(query).sort({ createdAt: -1 });

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                comments,
                "Comments fetched successfully.",
                { count: comments.length }
            )
        );
});

// Create New Comment
export const createComment = asyncHandler(async (req, res) => {
    const { author, email, content, postId, postTitle } = req.body;

    const newComment = await Comment.create({
        author,
        email,
        content,
        postId,
        postTitle,
        status: "pending",
        updatedAt: new Date().toISOString().split("T")[0],
    });

    return res
        .status(HttpStatus.CREATED || 201)
        .json(
            new ApiResponse(
                HttpStatus.CREATED || 201,
                newComment,
                "Comment submitted and awaiting approval."
            )
        );
});

// Update Comment Status (Approve/Spam)
export const updateCommentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "pending", "spam"].includes(status)) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "Invalid status value."
        );
    }

    const updatedComment = await Comment.findByIdAndUpdate(
        id,
        { status, updatedAt: new Date().toISOString().split("T")[0] },
        { new: true }
    );

    if (!updatedComment) {
        throw new ApiError(HttpStatus.NOT_FOUND || 404, "Comment not found.");
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                updatedComment,
                `Comment status updated to ${status}.`
            )
        );
});

// Delete Single Comment
export const deleteComment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
        throw new ApiError(HttpStatus.NOT_FOUND || 404, "Comment not found.");
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                null,
                "Comment deleted successfully."
            )
        );
});

// Bulk Delete Comments
export const bulkDeleteComments = asyncHandler(async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "No comment IDs provided."
        );
    }

    const result = await Comment.deleteMany({ _id: { $in: ids } });

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                null,
                `${result.deletedCount} comments deleted successfully.`
            )
        );
});

// Send Reply to Comment & Email Notification
export const sendReply = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { replyContent } = req.body;

    if (!replyContent) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "Reply content is required."
        );
    }

    const comment = await Comment.findById(id);
    if (!comment) {
        throw new ApiError(HttpStatus.NOT_FOUND || 404, "Comment not found.");
    }

    comment.replies.push({ replyContent });
    await comment.save();

    try {
        const subject = `New reply on your comment regarding "${comment.postTitle || "our post"}"`;
        const body = `Hi ${comment.author},\n\nAdmin has replied to your comment:\n\n"${replyContent}"\n\nThank you for engaging with us!`;

        await sendEmail(comment.email, subject, body);
    } catch (emailError) {
        console.error("Email sending failed:", emailError.message);
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                comment,
                "Reply sent and notification email dispatched successfully."
            )
        );
});