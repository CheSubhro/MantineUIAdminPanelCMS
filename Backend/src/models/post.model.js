
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Post title is required"],
            trim: true,
            minlength: [3, "Post title must be at least 3 characters long"],
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[a-z0-9-]+$/,
                "Slug must be lowercase and contain only letters, numbers, and hyphens",
            ],
        },
        excerpt: {
            type: String,
            maxlength: [300, "Excerpt cannot exceed 300 characters"],
            default: "",
        },
        content: {
            type: String,
            default: "",
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
            default: "Technology",
        },
        author: {
            type: String,
            required: [true, "Author name is required"],
            default: "Subhro Mondal",
        },
        status: {
            type: String,
            enum: ["Published", "Draft"],
            default: "Published",
        },
        publishDate: {
            type: String,
            default: () => new Date().toISOString().split("T")[0],
        },
        image: {
            type: String,
            default: "", // Cloudinary Image URL
        },
        imagePublicId: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;