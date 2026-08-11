
import { jest } from "@jest/globals";

jest.unstable_mockModule("../../src/models/User.model.js", () => ({
    default: {
        findOne: jest.fn(),
        create: jest.fn(),
    },
}));

const userController = await import("../../src/controllers/user.controller.js");
const User = (await import("../../src/models/User.model.js")).default;

describe("User Controller Unit Tests", () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, params: {}, query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    it("should create a new user", async () => {
        req.body = {
            name: "Test User",
            email: "test@example.com",
            password: "password123",
        };

        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({
            _id: "60c72b2f9b1d8b2d88f32a1a",
            name: req.body.name,
            email: req.body.email,
            role: "User",
            status: "Active",
            toObject: () => ({ ...req.body, _id: "60c72b2f9b1d8b2d88f32a1a" }),
        });

        await userController.createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
            })
        );
    });

    it("should handle error when creating a user fails (email already exists)", async () => {
        req.body = {
            name: "Test User",
            email: "existing@example.com",
            password: "password123",
        };

        User.findOne.mockResolvedValue({ email: "existing@example.com" });

        await userController.createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false,
                message: "Email is already in use.",
            })
        );
    });
});