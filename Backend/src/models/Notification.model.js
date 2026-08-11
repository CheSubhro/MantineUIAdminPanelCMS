
import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        unread: {
            type: Boolean,
            default: true,
        },
        type: {
            type: String,
            enum: ["info", "alert", "success", "user", "post"],
            default: "info",
        },
    },
    { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);