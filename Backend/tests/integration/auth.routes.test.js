
import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";
import cookieParser from "cookie-parser";

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

const authRoutes = (await import("../../src/routes/auth.routes.js")).default;
const User = (await import("../../src/models/User.model.js")).default;
const bcrypt = (await import("bcrypt")).default;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

describe("Auth API Integration Tests (Mocked)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should register a user via POST /api/auth/register", async () => {
        User.findOne.mockResolvedValue(null);
        const mockCreatedUser = {
            name: "Jane Doe",
            username: "janedoe",
            email: "jane@example.com",
            toObject: function () {
                return { ...this };
            },
        };
        User.create.mockResolvedValue(mockCreatedUser);

        const res = await request(app).post("/api/auth/register").send({
            name: "Jane Doe",
            username: "janedoe",
            email: "jane@example.com",
            password: "securepassword",
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.email).toBe("jane@example.com");
    });

    it("should login a user via POST /api/auth/login", async () => {
        const mockUser = {
            _id: "60c72b2f9b1d8b2d88f32a1a",
            username: "janedoe",
            password: "hashedpassword",
            toObject: function () {
                return { ...this };
            },
        };

        User.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);

        const res = await request(app).post("/api/auth/login").send({
            identifier: "janedoe",
            password: "securepassword",
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.headers["set-cookie"]).toBeDefined();
    });
});