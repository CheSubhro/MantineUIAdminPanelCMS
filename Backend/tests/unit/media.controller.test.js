
import {
    getMediaFiles,
    uploadMedia,
    deleteMedia,
} from "../../src/controllers/media.controller.js";
import Media from "../../src/models/Media.model.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../../src/utils/Cloudinary.js";

// Mock dependencies
jest.mock("../models/Media.model.js");
jest.mock("../utils/Cloudinary.js");

describe("Media Controller Unit Tests", () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, params: {}, query: {}, user: { _id: "user123" } };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe("getMediaFiles", () => {
        it("should fetch all media files successfully", async () => {
            const mockMedia = [{ _id: "1", name: "test.jpg" }];
            Media.find.mockReturnValue({
                sort: jest.fn().mockResolvedValue(mockMedia),
            });

            await getMediaFiles(req, res, next);

            expect(Media.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    success: true,
                    data: mockMedia,
                })
            );
        });
    });

    describe("uploadMedia", () => {
        it("should upload file to cloudinary and save to database", async () => {
            req.file = {
                path: "temp/path.jpg",
                originalname: "test.jpg",
                size: 1024,
            };
            uploadOnCloudinary.mockResolvedValue({
                secure_url: "http://cloudinary.com/test.jpg",
                public_id: "public_123",
            });
            Media.create.mockResolvedValue({
                _id: "media123",
                name: "test.jpg",
                url: "http://cloudinary.com/test.jpg",
            });

            await uploadMedia(req, res, next);

            expect(uploadOnCloudinary).toHaveBeenCalledWith("temp/path.jpg");
            expect(Media.create).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
        });

        it("should throw error if no file is provided", async () => {
            req.file = null;
            await expect(uploadMedia(req, res, next)).rejects.toThrow();
        });
    });

    describe("deleteMedia", () => {
        it("should delete media from cloudinary and database", async () => {
            req.params.id = "media123";
            const mockMedia = { _id: "media123", publicId: "public_123" };
            Media.findById.mockResolvedValue(mockMedia);
            deleteFromCloudinary.mockResolvedValue({ result: "ok" });
            Media.findByIdAndDelete.mockResolvedValue(mockMedia);

            await deleteMedia(req, res, next);

            expect(Media.findById).toHaveBeenCalledWith("media123");
            expect(deleteFromCloudinary).toHaveBeenCalledWith("public_123");
            expect(Media.findByIdAndDelete).toHaveBeenCalledWith("media123");
            expect(res.status).toHaveBeenCalledWith(200);
        });
    });
});