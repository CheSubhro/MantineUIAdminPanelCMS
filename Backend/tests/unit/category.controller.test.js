
import { jest } from "@jest/globals";

jest.unstable_mockModule("../../src/models/Category.model.js", () => ({
    default: {
        create: jest.fn(),
    },
}));

jest.unstable_mockModule("../../src/utils/Cloudinary.js", () => ({
    uploadOnCloudinary: jest.fn().mockResolvedValue({
        secure_url: "https://res.cloudinary.com/test/category-image.jpg",
        public_id: "category_test_id",
    }),
    deleteFromCloudinary: jest.fn().mockResolvedValue(true),
}));

const categoryController = await import(
    "../../src/controllers/category.controller.js"
);
const Category = (await import("../../src/models/Category.model.js")).default;

describe("Category Controller Unit Tests", () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, params: {}, query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    it("should create a new category", async () => {
        req.body = {
            name: "Travel",
            slug: "travel",
            description: "Travel guides",
        };

        Category.create.mockResolvedValue(req.body);

        await categoryController.createCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
            })
        );
    });

    it("should handle error when creating a category fails", async () => {
        req.body = { name: "Travel" };
        Category.create.mockRejectedValue(new Error("Database Error"));

        await categoryController.createCategory(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false,
            })
        );
    });
});