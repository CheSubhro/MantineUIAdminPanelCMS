
import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";

jest.unstable_mockModule("../../src/models/Page.model.js", () => ({
    default: {
        create: jest.fn(),
        find: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
        deleteMany: jest.fn(),
    },
}));

const pageRoutes = (await import("../../src/routes/page.routes.js")).default;
const Page = (await import("../../src/models/Page.model.js")).default;

const app = express();
app.use(express.json());
app.use("/api/pages", pageRoutes);

describe("Page API Integration Tests (Mocked)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new page successfully", async () => {
        const mockPageData = {
            _id: "60c72b2f9b1d8b2d88f32a1a",
            title: "Test Page Title",
            slug: "test-page-title",
            author: "Subhro Mondal",
            status: "Published",
            excerpt: "This is a test excerpt",
            content: "This is test content",
        };

        Page.create.mockResolvedValue(mockPageData);

        const res = await request(app).post("/api/pages").send({
            title: "Test Page Title",
            slug: "test-page-title",
            author: "Subhro Mondal",
            status: "Published",
            excerpt: "This is a test excerpt",
            content: "This is test content",
        });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe("Test Page Title");
    });

    it("should fetch all pages successfully", async () => {
        const mockPages = [
            {
                title: "Sample Page",
                slug: "sample-page",
                author: "Subhro Mondal",
            },
        ];

        Page.find.mockReturnValue({
            sort: jest.fn().mockResolvedValue(mockPages),
        });

        const res = await request(app).get("/api/pages");

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBe(1);
    });

    it("should update a page successfully", async () => {
        const updatedMockPage = {
            _id: "60c72b2f9b1d8b2d88f32a1a",
            title: "Updated Title",
            slug: "old-title",
            author: "Subhro Mondal",
        };

        Page.findByIdAndUpdate.mockResolvedValue(updatedMockPage);

        const res = await request(app)
            .put(`/api/pages/60c72b2f9b1d8b2d88f32a1a`)
            .send({ title: "Updated Title" });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.title).toBe("Updated Title");
    });

    it("should delete a single page successfully", async () => {
        Page.findByIdAndDelete.mockResolvedValue({
            _id: "60c72b2f9b1d8b2d88f32a1a",
        });

        const res = await request(app).delete(
            `/api/pages/60c72b2f9b1d8b2d88f32a1a`
        );

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });

    it("should delete multiple pages in bulk successfully", async () => {
        Page.deleteMany.mockResolvedValue({ deletedCount: 2 });

        const res = await request(app)
            .delete("/api/pages/bulk")
            .send({ ids: ["id1", "id2"] });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});