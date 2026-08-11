
import { jest } from "@jest/globals";

jest.unstable_mockModule("../../src/models/Page.model.js", () => ({
    default: {
        create: jest.fn(),
    },
}));

const pageController = await import("../../src/controllers/page.controller.js");
const Page = (await import("../../src/models/Page.model.js")).default;

describe("Page Controller Unit Tests", () => {
    let req, res;

    beforeEach(() => {
        req = { body: {}, params: {}, query: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();
    });

    it("should create a new page", async () => {
        req.body = { title: "Test Page", slug: "test-page" };

        Page.create.mockResolvedValue(req.body);

        await pageController.createPage(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: true,
            })
        );
    });

    it("should handle error when creating a page fails", async () => {
        req.body = { title: "Test" };
        Page.create.mockRejectedValue(new Error("Database Error"));

        await pageController.createPage(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false,
            })
        );
    });
});