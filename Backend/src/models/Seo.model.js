import mongoose, { Schema } from "mongoose";

const seoSchema = new Schema(
    {
        metaTitle: {
            type: String,
            default: "",
            trim: true,
        },
        metaDescription: {
            type: String,
            default: "",
        },
        focusKeyword: {
            type: String,
            default: "",
        },
        ogTitle: {
            type: String,
            default: "",
        },
        ogDescription: {
            type: String,
            default: "",
        },
        ogImage: {
            type: String,
            default: "",
        },
        robotsTxt: {
            type: String,
            default: "User-agent: *\nAllow: /",
        },
    },
    { timestamps: true }
);

export const Seo = mongoose.model("Seo", seoSchema);