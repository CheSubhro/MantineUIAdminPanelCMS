
import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";

jest.unstable_mockModule("../../src/models/Category.model.js", () => ({
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
    uploadOnCloudinary: jest.fn().mockResolvedValue({
        secure_url: "https://res.cloudinary.com/test/category-image.jpg",
        public_id: "category_test_id",
    }),
    deleteFromCloudinary: jest.fn().mockResolvedValue(true),
}));

const categoryRoutes = (await import("../../src/routes/category.routes.js"))
    .default;
const Category = (await import("../../src/models/Category.model.js")).default;

const app = express();
app.use(express.json());
app.use("/api/categories", categoryRoutes);

describe("Category API Integration Tests (Mocked)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new category successfully", async () => {
        const mockCategoryData = {
            _id: "60c72b2f9b1d8b2d88f32a2c",
            name: "Technology",
            slug: "technology",
            description: "Tech related posts",
            status: "Active",
        };

        Category.create.mockResolvedValue(mockCategoryData);

        const res = await request(app).post("/api/categories").send({
            name: "Technology",
            slug: "technology",
            description: "Tech related posts",
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe("Technology");
    });

    it("should fetch all categories successfully", async () => {
        const mockCategories = [
            {
                name: "Lifestyle",
                slug: "lifestyle",
                status: "Active",
            },
        ];

        Category.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockCategories),
        });

        const res = await request(app).get("/api/categories");

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBe(1);
    });

    it("should update a category successfully", async () => {
        const existingCategory = {
            _id: "60c72b2f9b1d8b2d88f32a2c",
            imagePublicId: "",
        };
        const updatedMockCategory = {
            _id: "60c72b2f9b1d8b2d88f32a2c",
            name: "Updated Technology",
            slug: "technology",
        };

        Category.findById.mockResolvedValue(existingCategory);
        Category.findByIdAndUpdate.mockResolvedValue(updatedMockCategory);

        const res = await request(app)
            .put(`/api/categories/60c72b2f9b1d8b2d88f32a2c`)
            .send({ name: "Updated Technology" });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe("Updated Technology");
    });

    it("should delete a single category successfully", async () => {
        Category.findByIdAndDelete.mockResolvedValue({
            _id: "60c72b2f9b1d8b2d88f32a2c",
            imagePublicId: "",
        });

        const res = await request(app).delete(
            `/api/categories/60c72b2f9b1d8b2d88f32a2c`
        );

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });

    it("should delete multiple categories in bulk successfully", async () => {
        Category.find.mockResolvedValue([]);
        Category.deleteMany.mockResolvedValue({ deletedCount: 2 });

        const res = await request(app)
            .delete("/api/categories/bulk")
            .send({ ids: ["id1", "id2"] });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});