
import { jest } from "@jest/globals";

jest.unstable_mockModule("../../src/models/Comment.model.js", () => ({
    default: {
        create: jest.fn(),
        find: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
        deleteMany: jest.fn(),
    },
}));

const commentController = await import(
    "../../src/controllers/comment.controller.js"
);
const Comment = (await import("../../src/models/Comment.model.js")).default;

describe("Comment Controller Unit Tests", () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, params: {}, query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    it("should create a new comment", async () => {
        req.body = {
            author: "John Doe",
            email: "john@example.com",
            content: "Great content!",
            postId: "60c72b2f9b1d8b2d88f32a1b",
        };

        Comment.create.mockResolvedValue(req.body);

        await commentController.createComment(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
            })
        );
    });

    it("should handle error when creating a comment fails", async () => {
        req.body = { author: "Incomplete Data" };
        Comment.create.mockRejectedValue(new Error("Database Error"));

        await commentController.createComment(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false,
            })
        );
    });

    it("should update comment status successfully", async () => {
        req.params.id = "60c72b2f9b1d8b2d88f32a1a";
        req.body.status = "approved";

        Comment.findByIdAndUpdate.mockResolvedValue({
            _id: "60c72b2f9b1d8b2d88f32a1a",
            status: "approved",
        });

        await commentController.updateCommentStatus(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
            })
        );
    });
});