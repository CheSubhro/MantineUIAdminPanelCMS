
import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";

jest.unstable_mockModule("../../src/models/post.model.js", () => ({
    default: {
        create: jest.fn(),
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
        deleteMany: jest.fn(),
    },
}));

jest.unstable_mockModule("../../src/utils/Cloudinary.js", () => ({
    uploadOnCloudinary: jest
        .fn()
        .mockResolvedValue({
            secure_url: "https://res.cloudinary.com/test/image.jpg",
        }),
    deleteFromCloudinary: jest.fn().mockResolvedValue(true),
}));

const postRoutes = (await import("../../src/routes/post.routes.js")).default;
const Post = (await import("../../src/models/post.model.js")).default;

const app = express();
app.use(express.json());
app.use("/api/posts", postRoutes);

describe("Post API Integration Tests (Mocked)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new post successfully", async () => {
        const mockPostData = {
            _id: "60c72b2f9b1d8b2d88f32a1b",
            title: "Test Post Title",
            slug: "test-post-title",
            category: "Technology",
            author: "Subhro Mondal",
            status: "Published",
        };

        Post.create.mockResolvedValue(mockPostData);

        const res = await request(app).post("/api/posts").send({
            title: "Test Post Title",
            slug: "test-post-title",
            category: "Technology",
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe("Test Post Title");
    });

    it("should fetch all posts successfully", async () => {
        const mockPosts = [
            {
                title: "Sample Post",
                slug: "sample-post",
                category: "Technology",
            },
        ];

        Post.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockPosts),
        });

        const res = await request(app).get("/api/posts");

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBe(1);
    });

    it("should update a post successfully", async () => {
        const existingPost = { _id: "60c72b2f9b1d8b2d88f32a1b", image: "" };
        const updatedMockPost = {
            _id: "60c72b2f9b1d8b2d88f32a1b",
            title: "Updated Post Title",
            slug: "sample-post",
        };

        Post.findById.mockResolvedValue(existingPost);
        Post.findByIdAndUpdate.mockResolvedValue(updatedMockPost);

        const res = await request(app)
            .put(`/api/posts/60c72b2f9b1d8b2d88f32a1b`)
            .send({ title: "Updated Post Title" });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe("Updated Post Title");
    });

    it("should delete a single post successfully", async () => {
        Post.findByIdAndDelete.mockResolvedValue({
            _id: "60c72b2f9b1d8b2d88f32a1b",
            image: "",
        });

        const res = await request(app).delete(
            `/api/posts/60c72b2f9b1d8b2d88f32a1b`
        );

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });

    it("should delete multiple posts in bulk successfully", async () => {
        Post.find.mockResolvedValue([]);
        Post.deleteMany.mockResolvedValue({ deletedCount: 2 });

        const res = await request(app)
            .delete("/api/posts/bulk")
            .send({ ids: ["id1", "id2"] });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});