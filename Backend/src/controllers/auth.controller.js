
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateTokens } from "../utils/generateToken.js";
import {
    cookieOptions,
    refreshCookieOptions,
    clearCookieOptions,
} from "../utils/Constants.js";

import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/Cloudinary.js";

// Register Handler (Fully Fixed with Cloudinary Integration)
export const register = asyncHandler(async (req, res) => {
  
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "All required fields (name, username, email, password) must be provided."
        );
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "User with this email or username already exists."
        );
    }

    // Avatar Upload Handler
    let avatarUrl = "";
    let avatarPublicId = "";
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    
    if (avatarLocalPath) {
        const normalizedPath = avatarLocalPath.replace(/\\/g, "/");
        const avatarResponse = await uploadOnCloudinary(normalizedPath);
        if (avatarResponse && avatarResponse.secure_url) {
            avatarUrl = avatarResponse.secure_url;
            avatarPublicId = avatarResponse.public_id;
        }
    }

    // Cover Image Upload Handler
    let coverImageUrl = "";
    let coverImagePublicId = "";
    const coverLocalPath = req.files?.coverImage?.[0]?.path;

    if (coverLocalPath) {
        const normalizedPath = coverLocalPath.replace(/\\/g, "/");
        const coverResponse = await uploadOnCloudinary(normalizedPath);
        if (coverResponse && coverResponse.secure_url) {
            coverImageUrl = coverResponse.secure_url;
            coverImagePublicId = coverResponse.public_id;
        }
    }

    const newUser = await User.create({
        name,
        username,
        email,
        password,
        avatar: avatarUrl,
        avatarPublicId: avatarPublicId,
        coverImage: coverImageUrl,
        coverImagePublicId: coverImagePublicId,
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

    return res
        .status(HttpStatus.CREATED || 201)
        .json(
            new ApiResponse(
                HttpStatus.CREATED || 201,
                userResponse,
                "Registration successful with images. Please login with your credentials."
            )
        );
});

// Login Handler (Saves Refresh Token in DB & sets Cookies)
export const login = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        throw new ApiError(
            HttpStatus.BAD_REQUEST || 400,
            "Please provide username/email and password."
        );
    }

    const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
        throw new ApiError(
            HttpStatus.UNAUTHORIZED || 401,
            "Invalid username/email or password."
        );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new ApiError(
            HttpStatus.UNAUTHORIZED || 401,
            "Invalid username/email or password."
        );
    }

    // Generate Access & Refresh Tokens
    const { accessToken, refreshToken } = generateTokens(user._id);

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

    return res
        .status(HttpStatus.OK || 200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, refreshCookieOptions)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                { user: userResponse, accessToken },
                "Login successful."
            )
        );
});

// Refresh Access Token Handler
export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(
            HttpStatus.UNAUTHORIZED || 401,
            "Unauthorized request. Refresh token is missing."
        );
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret_key"
        );

        const user = await User.findById(decodedToken.id);

        if (!user || user.refreshToken !== incomingRefreshToken) {
            throw new ApiError(
                HttpStatus.UNAUTHORIZED || 401,
                "Refresh token is expired or invalid."
            );
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(
            user._id
        );

        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        return res
            .status(HttpStatus.OK || 200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", newRefreshToken, refreshCookieOptions)
            .json(
                new ApiResponse(
                    HttpStatus.OK || 200,
                    { accessToken },
                    "Access token refreshed successfully."
                )
            );
    } catch (error) {
        throw new ApiError(
            HttpStatus.UNAUTHORIZED || 401,
            error?.message || "Invalid refresh token."
        );
    }
});

// Get Current User Profile
export const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select(
        "-password -refreshToken"
    );

    if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND || 404, "User not found.");
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                user,
                "Profile fetched successfully."
            )
        );
});

// Update Profile Handler (With Cloudinary Image Replacement)
export const updateProfile = asyncHandler(async (req, res) => {

    const updateData = { ...req.body };

    delete updateData.role;
    delete updateData.status;
    delete updateData.refreshToken;

    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    if (updateData.email || updateData.username) {
        const existingConflict = await User.findOne({
            _id: { $ne: req.user.id },
            $or: [
                ...(updateData.email ? [{ email: updateData.email }] : []),
                ...(updateData.username
                    ? [{ username: updateData.username }]
                    : []),
            ],
        });
        if (existingConflict) {
            throw new ApiError(
                400,
                "Email or Username is already in use by another account."
            );
        }
    }

    const existingUser = await User.findById(req.user.id);
    if (!existingUser) {
        throw new ApiError(HttpStatus.NOT_FOUND || 404, "User not found.");
    }

    // Avatar Upload & Old Avatar Delete
    if (req.files && req.files.avatar && req.files.avatar[0]) {
        const avatarLocalPath = req.files.avatar[0].path.replace(/\\/g, "/");
        const avatarResponse = await uploadOnCloudinary(avatarLocalPath);

        if (!avatarResponse) {
            throw new ApiError(400, "Failed to upload new avatar.");
        }

        if (existingUser.avatarPublicId) {
            await deleteFromCloudinary(existingUser.avatarPublicId);
        }

        updateData.avatar = avatarResponse.secure_url;
        updateData.avatarPublicId = avatarResponse.public_id;
    }

    // Cover Image Upload & Old Cover Image Delete
    if (req.files && req.files.coverImage && req.files.coverImage[0]) {
        const coverLocalPath = req.files.coverImage[0].path.replace(/\\/g, "/");
        const coverResponse = await uploadOnCloudinary(coverLocalPath);

        if (!coverResponse) {
            throw new ApiError(400, "Failed to upload new cover image.");
        }

        if (existingUser.coverImagePublicId) {
            await deleteFromCloudinary(existingUser.coverImagePublicId);
        }

        updateData.coverImage = coverResponse.secure_url;
        updateData.coverImagePublicId = coverResponse.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
        new: true,
        runValidators: true,
    }).select("-password -refreshToken");

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                updatedUser,
                "Profile updated successfully."
            )
        );
});

// Delete Account Handler (Clears DB refreshToken, Cloudinary Images & Cookies)
export const deleteAccount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND || 404, "User not found.");
    }

    if (user.avatarPublicId) {
        await deleteFromCloudinary(user.avatarPublicId);
    }

    if (user.coverImagePublicId) {
        await deleteFromCloudinary(user.coverImagePublicId);
    }

    const deletedUser = await User.findByIdAndDelete(req.user.id);

    if (!deletedUser) {
        throw new ApiError(HttpStatus.NOT_FOUND || 404, "User not found.");
    }

    return res
        .status(HttpStatus.OK || 200)
        .clearCookie("accessToken", clearCookieOptions)
        .clearCookie("refreshToken", clearCookieOptions)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                null,
                "Account and associated images deleted successfully."
            )
        );
});

// Logout Handler (Clears DB refreshToken & Cookies)
export const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user.id,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    return res
        .status(HttpStatus.OK || 200)
        .clearCookie("accessToken", clearCookieOptions)
        .clearCookie("refreshToken", clearCookieOptions)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                null,
                "Logged out successfully."
            )
        );
});