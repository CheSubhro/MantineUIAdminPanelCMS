
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/Cloudinary.js";

// Get All Users (with Search & Filter by name, email, or role)
export const getAllUsers = asyncHandler(async (req, res) => {
    const { search, role, status } = req.query;
    let query = {};

    if (search) {
        const searchRegex = new RegExp(search, "i");
        query.$or = [{ name: searchRegex }, { email: searchRegex }];
    }

    if (role && role !== "All") {
        query.role = role;
    }

    if (status && status !== "All") {
        query.status = status;
    }

    const users = await User.find(query)
        .select("-password")
        .sort({ createdAt: -1 });

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                users,
                "Users fetched successfully.",
                { count: users.length }
            )
        );
});

// Create New User (By Admin)
export const createUser = asyncHandler(async (req, res) => {
    const { name, username, email, password, role, status } = req.body;

    if (!name || !username || !email || !password) {
        throw new ApiError(400, "All required fields (name, username, email, password) must be provided.");
    }

    const existingUser = await User.findOne({
        $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
    });

    if (existingUser) {
        throw new ApiError(409, "User with this email or username already exists.");
    }

    const userData = {
        name,
        username,
        email,
        password,
        role: role || "User",
        status: status || "Active",
    };

    // Avatar Upload Handler
    if (req.files && req.files.avatar && req.files.avatar[0]) {
        const avatarLocalPath = req.files.avatar[0].path.replace(/\\/g, "/");
        const avatarResponse = await uploadOnCloudinary(avatarLocalPath);
        if (avatarResponse) {
            userData.avatar = avatarResponse.secure_url;
            userData.avatarPublicId = avatarResponse.public_id;
        }
    }

    // Cover Image Upload Handler
    if (req.files && req.files.coverImage && req.files.coverImage[0]) {
        const coverLocalPath = req.files.coverImage[0].path.replace(/\\/g, "/");
        const coverResponse = await uploadOnCloudinary(coverLocalPath);
        if (coverResponse) {
            userData.coverImage = coverResponse.secure_url;
            userData.coverImagePublicId = coverResponse.public_id;
        }
    }

    const newUser = await User.create(userData);
    const createdUser = await User.findById(newUser._id).select("-password");

    return res
        .status(HttpStatus.CREATED || 201)
        .json(
            new ApiResponse(
                HttpStatus.CREATED || 201,
                createdUser,
                "User created successfully."
            )
        );
});

// Update User Details (By Admin/ID with Cloudinary Image Replacement)
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body };

    
    if (!updateData.password || updateData.password.trim() === "") {
        delete updateData.password;
    } else {
        const saltRounds = 10;
        updateData.password = await bcrypt.hash(
            updateData.password,
            saltRounds
        );
    }
    
    const existingUser = await User.findById(id);
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

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    }).select("-password");

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                updatedUser,
                "User updated successfully."
            )
        );
});

// Delete Single User by ID (With Cloudinary Images Cleanup)
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND || 404, "User not found.");
    }

    // Delete avatar from Cloudinary if exists
    if (user.avatarPublicId) {
        await deleteFromCloudinary(user.avatarPublicId);
    }

    // Delete cover image from Cloudinary if exists
    if (user.coverImagePublicId) {
        await deleteFromCloudinary(user.coverImagePublicId);
    }

    const deletedUser = await User.findByIdAndDelete(id);

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                null,
                "User and associated images deleted successfully."
            )
        );
});