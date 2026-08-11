
import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";

jest.unstable_mockModule("../../src/models/Comment.model.js", () => ({
    default: {
        create: jest.fn(),
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
        deleteMany: jest.fn(),
    },
}));

const commentRoutes = (await import("../../src/routes/comment.routes.js"))
    .default;
const Comment = (await import("../../src/models/Comment.model.js")).default;

const app = express();
app.use(express.json());
app.use("/api/comments", commentRoutes);

describe("Comment API Integration Tests (Mocked)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should submit a new comment successfully", async () => {
        const mockCommentData = {
            _id: "60c72b2f9b1d8b2d88f32a1a",
            author: "John Doe",
            email: "john@example.com",
            content: "This is a great post!",
            postId: "60c72b2f9b1d8b2d88f32a1b",
            postTitle: "React Guide",
            status: "pending",
        };

        Comment.create.mockResolvedValue(mockCommentData);

        const res = await request(app).post("/api/comments").send({
            author: "John Doe",
            email: "john@example.com",
            content: "This is a great post!",
            postId: "60c72b2f9b1d8b2d88f32a1b",
            postTitle: "React Guide",
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.author).toBe("John Doe");
    });

    it("should fetch all comments successfully", async () => {
        const mockComments = [
            {
                author: "John Doe",
                content: "Nice post!",
                status: "approved",
            },
        ];

        Comment.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockComments),
        });

        const res = await request(app).get("/api/comments");

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBe(1);
    });

    it("should update comment status successfully", async () => {
        const updatedMockComment = {
            _id: "60c72b2f9b1d8b2d88f32a1a",
            status: "approved",
        };

        Comment.findByIdAndUpdate.mockResolvedValue(updatedMockComment);

        const res = await request(app)
            .patch(`/api/comments/60c72b2f9b1d8b2d88f32a1a`)
            .send({ status: "approved" });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.status).toBe("approved");
    });

    it("should send a reply to a comment successfully", async () => {
        const mockCommentInstance = {
            _id: "60c72b2f9b1d8b2d88f32a1a",
            author: "John Doe",
            email: "john@example.com",
            postTitle: "React Guide",
            replies: [],
            save: jest.fn().mockResolvedValue(true),
        };

        Comment.findById.mockResolvedValue(mockCommentInstance);

        const res = await request(app)
            .post(`/api/comments/60c72b2f9b1d8b2d88f32a1a`)
            .send({ replyContent: "Thank you for your feedback!" });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain("Reply sent");
    });

    it("should delete a single comment successfully", async () => {
        Comment.findByIdAndDelete.mockResolvedValue({
            _id: "60c72b2f9b1d8b2d88f32a1a",
        });

        const res = await request(app).delete(
            `/api/comments/60c72b2f9b1d8b2d88f32a1a`
        );

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });

    it("should delete multiple comments in bulk successfully", async () => {
        Comment.deleteMany.mockResolvedValue({ deletedCount: 2 });

        const res = await request(app)
            .delete("/api/comments/bulk")
            .send({ ids: ["id1", "id2"] });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});