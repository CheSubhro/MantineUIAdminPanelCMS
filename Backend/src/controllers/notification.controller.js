
import { Notification } from "../models/Notification.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";

// Get all notifications
export const getAllNotifications = asyncHandler(async (req, res) => {
    const notifications = await Notification.find().sort({ createdAt: -1 });

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                notifications,
                "Notifications fetched successfully."
            )
        );
});

// Mark single notification as read
export const markAsRead = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
        id,
        { unread: false },
        { new: true }
    );

    if (!notification) {
        throw new ApiError(
            HttpStatus.NOT_FOUND || 404,
            "Notification not found."
        );
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                notification,
                "Notification marked as read."
            )
        );
});

// Mark all notifications as read
export const markAllAsRead = asyncHandler(async (req, res) => {
    await Notification.updateMany({ unread: true }, { unread: false });

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                {},
                "All notifications marked as read."
            )
        );
});

// Delete a notification
export const deleteNotification = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
        throw new ApiError(
            HttpStatus.NOT_FOUND || 404,
            "Notification not found."
        );
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                {},
                "Notification deleted successfully."
            )
        );
});