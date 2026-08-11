
import { jest } from "@jest/globals";

jest.unstable_mockModule("../../src/models/User.model.js", () => ({
    default: {
        findOne: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    },
}));

jest.unstable_mockModule("bcrypt", () => ({
    default: {
        compare: jest.fn(),
        genSalt: jest.fn(),
        hash: jest.fn(),
    },
}));

jest.unstable_mockModule("../../src/utils/generateToken.js", () => ({
    generateTokens: jest.fn(() => ({
        accessToken: "mock_access_token",
        refreshToken: "mock_refresh_token",
    })),
}));

const authController = await import("../../src/controllers/auth.controller.js");
const User = (await import("../../src/models/User.model.js")).default;
const bcrypt = (await import("bcrypt")).default;

describe("Auth Controller Unit Tests", () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            user: { id: "60c72b2f9b1d8b2d88f32a1a" },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            cookie: jest.fn().mockReturnThis(),
            clearCookie: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    it("should register a new user successfully", async () => {
        req.body = {
            name: "John Doe",
            username: "johndoe",
            email: "john@example.com",
            password: "password123",
        };

        User.findOne.mockResolvedValue(null);

        const mockCreatedUser = {
            ...req.body,
            toObject: function () {
                return { ...this };
            },
        };
        User.create.mockResolvedValue(mockCreatedUser);

        await authController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
                message:
                    "Registration successful. Please login with your credentials.",
            })
        );
    });

    it("should login a user successfully and set cookies", async () => {
        req.body = { identifier: "john@example.com", password: "password123" };

        const mockUser = {
            _id: "60c72b2f9b1d8b2d88f32a1a",
            email: "john@example.com",
            password: "hashedpassword",
            toObject: function () {
                return { ...this };
            },
        };

        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);

        await authController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.cookie).toHaveBeenCalledTimes(2);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
                message: "Login successful.",
            })
        );
    });

    it("should fetch authenticated user profile", async () => {
        const mockUser = {
            _id: "60c72b2f9b1d8b2d88f32a1a",
            name: "John Doe",
            email: "john@example.com",
        };

        User.findById.mockReturnValue({
            select: jest.fn().mockResolvedValue(mockUser),
        });

        await authController.getProfile(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
                data: mockUser,
            })
        );
    });
});