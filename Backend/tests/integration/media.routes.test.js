
import request from "supertest";
import express from "express";
import mediaRoutes from "../../src/routes/media.routes.js";
import Media from "../../src/models/Media.model.js";

// Mock auth and cloudinary middleware/utils
jest.mock("../middlewares/auth.middleware.js", () => ({
    verifyJWT: (req, res, next) => {
        req.user = { _id: "user123" };
        next();
    },
}));

jest.mock("../models/Media.model.js");
jest.mock("../utils/Cloudinary.js", () => ({
    uploadOnCloudinary: jest.fn().mockResolvedValue({
        secure_url: "http://cloudinary.com/test.jpg",
        public_id: "public_123",
    }),
    deleteFromCloudinary: jest.fn().mockResolvedValue({ result: "ok" }),
}));

const app = express();
app.use(express.json());
app.use("/api/media", mediaRoutes);

describe("Media API Routes Integration Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("GET /api/media should return 200 and list of media", async () => {
        Media.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue([{ _id: "1", name: "test.jpg" }]),
        });

        const response = await request(app).get("/api/media");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("DELETE /api/media/:id should delete media file", async () => {
        Media.findById.mockResolvedValue({
            _id: "media123",
            publicId: "public_123",
        });
        Media.findByIdAndDelete.mockResolvedValue({ _id: "media123" });

        const response = await request(app).delete("/api/media/media123");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });
});