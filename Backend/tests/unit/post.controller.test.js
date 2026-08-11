
import { jest } from "@jest/globals";

jest.unstable_mockModule("../../src/models/Post.model.js", () => ({
    default: {
        create: jest.fn(),
    },
}));

jest.unstable_mockModule("../../src/utils/Cloudinary.js", () => ({
    uploadOnCloudinary: jest.fn().mockResolvedValue({
        secure_url: "https://res.cloudinary.com/test/image.jpg",
    }),
    deleteFromCloudinary: jest.fn().mockResolvedValue(true),
}));

const postController = await import("../../src/controllers/post.controller.js");
const Post = (await import("../../src/models/Post.model.js")).default;

describe("Post Controller Unit Tests", () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, params: {}, query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    it("should create a new post", async () => {
        req.body = {
            title: "Test Post",
            slug: "test-post",
            category: "Technology",
        };

        Post.create.mockResolvedValue(req.body);

        await postController.createPost(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
            })
        );
    });

    it("should handle error when creating a post fails", async () => {
        req.body = { title: "Test" };
        Post.create.mockRejectedValue(new Error("Database Error"));

        await postController.createPost(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false,
            })
        );
    });
});