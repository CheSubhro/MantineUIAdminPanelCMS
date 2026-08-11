
import { Setting } from "../models/Setting.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import HttpStatus from "../utils/HttpStatus.js";

// Get system settings 
export const getSettings = asyncHandler(async (req, res) => {
    let settings = await Setting.findOne();

    if (!settings) {
        settings = await Setting.create({});
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                settings,
                "Settings fetched successfully."
            )
        );
});

// Update or Upsert system settings
export const updateSettings = asyncHandler(async (req, res) => {
    const updatedSettings = await Setting.findOneAndUpdate({}, req.body, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
    });

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                updatedSettings,
                "System configurations updated successfully."
            )
        );
});