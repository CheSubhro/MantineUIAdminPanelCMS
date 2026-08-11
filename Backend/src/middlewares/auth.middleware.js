
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    // Read token from cookies (or fallback to authorization header if needed)
    const token =
        req.cookies?.accessToken ||
        req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(
            HttpStatus.UNAUTHORIZED || 401,
            "Unauthorized request. Access token is missing."
        );
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET || "your_access_token_secret_key"
        );

        // Attach user info to request object
        req.user = decoded; // Contains { id: userId }
        next();
    } catch (error) {
        throw new ApiError(
            HttpStatus.UNAUTHORIZED || 401,
            "Invalid or expired access token."
        );
    }
});