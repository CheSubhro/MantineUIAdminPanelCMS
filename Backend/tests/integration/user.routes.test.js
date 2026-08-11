
import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";

jest.unstable_mockModule("../../src/models/User.model.js", () => ({
    default: {
        findOne: jest.fn(),
        create: jest.fn(),
        find: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    },
}));

const userRoutes = (await import("../../src/routes/user.routes.js")).default;
const User = (await import("../../src/models/User.model.js")).default;

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

describe("User API Integration Tests (Mocked)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new user successfully", async () => {
        const mockUserData = {
            _id: "60c72b2f9b1d8b2d88f32a1a",
            name: "Subhro Mondal",
            email: "subhro@example.com",
            role: "Admin",
            status: "Active",
        };

        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue(mockUserData);

        const res = await request(app).post("/api/users").send({
            name: "Subhro Mondal",
            email: "subhro@example.com",
            password: "password123",
            role: "Admin",
            status: "Active",
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe("Subhro Mondal");
    });

    it("should fetch all users successfully", async () => {
        const mockUsers = [
            {
                _id: "60c72b2f9b1d8b2d88f32a1a",
                name: "Subhro Mondal",
                email: "subhro@example.com",
            },
        ];

        User.find.mockReturnValue({
            select: jest.fn().mockReturnValue({
                sort: jest.fn().mockResolvedValue(mockUsers),
            }),
        });

        const res = await request(app).get("/api/users");

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBe(1);
    });

    it("should update a user successfully", async () => {
        const updatedMockUser = {
            _id: "60c72b2f9b1d8b2d88f32a1a",
            name: "Updated Name",
            email: "subhro@example.com",
            role: "Manager",
        };

        User.findByIdAndUpdate.mockReturnValue({
            select: jest.fn().mockResolvedValue(updatedMockUser),
        });

        const res = await request(app)
            .put(`/api/users/60c72b2f9b1d8b2d88f32a1a`)
            .send({ name: "Updated Name" });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe("Updated Name");
    });

    it("should delete a single user successfully", async () => {
        User.findByIdAndDelete.mockResolvedValue({
            _id: "60c72b2f9b1d8b2d88f32a1a",
        });

        const res = await request(app).delete(
            `/api/users/60c72b2f9b1d8b2d88f32a1a`
        );

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});