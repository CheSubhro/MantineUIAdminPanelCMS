
import jwt from "jsonwebtoken";

export const generateTokens = (userId) => {
    const accessToken = jwt.sign(
        { id: userId },
        process.env.ACCESS_TOKEN_SECRET || "your_access_token_secret_key",
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" }
    );

    const refreshToken = jwt.sign(
        { id: userId },
        process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret_key",
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d" }
    );

    return { accessToken, refreshToken };
};