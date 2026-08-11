
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: [true, "Author name is required"],
            trim: true,
            minlength: [2, "Author name must be at least 2 characters long"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email address",
            ],
        },
        content: {
            type: String,
            required: [true, "Comment content is required"],
            trim: true,
            maxlength: [1000, "Comment cannot exceed 1000 characters"],
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: [true, "Post ID reference is required"],
            index: true,
        },
        postTitle: {
            type: String,
            trim: true,
            default: "",
        },
        status: {
            type: String,
            enum: ["approved", "pending", "spam"],
            default: "pending",
            index: true,
        },
        replies: [
            {
                replyContent: {
                    type: String,
                    required: true,
                    trim: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        updatedAt: {
            type: String,
            default: () => new Date().toISOString().split("T")[0],
        },
    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;