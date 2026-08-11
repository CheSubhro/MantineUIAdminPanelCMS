
import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Media name is required"],
            trim: true,
        },
        url: {
            type: String,
            required: [true, "Media URL is required"],
        },
        size: {
            type: Number,
            required: [true, "Media file size is required"],
        },
        publicId: {
            type: String,
            required: [true, "Cloudinary public ID is required"],
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Uploader reference is required"],
        },
    },
    {
        timestamps: true,
    }
);

const Media = mongoose.models.Media || mongoose.model("Media", mediaSchema);

export default Media;