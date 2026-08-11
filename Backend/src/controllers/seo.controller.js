
import { Seo } from "../models/Seo.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import HttpStatus from "../utils/HttpStatus.js";

// Get SEO settings 
export const getSeoSettings = asyncHandler(async (req, res) => {
    let seoConfig = await Seo.findOne();

    if (!seoConfig) {
        seoConfig = await Seo.create({
            metaTitle: "",
            metaDescription: "",
            focusKeyword: "",
            robotsTxt: "User-agent: *\nAllow: /",
        });
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                seoConfig,
                "SEO settings fetched successfully."
            )
        );
});

// Update or Create SEO settings
export const updateSeoSettings = asyncHandler(async (req, res) => {
    const {
        metaTitle,
        metaDescription,
        focusKeyword,
        ogTitle,
        ogDescription,
        ogImage,
        robotsTxt,
    } = req.body;

    const updatedSeo = await Seo.findOneAndUpdate(
        {},
        {
            metaTitle,
            metaDescription,
            focusKeyword,
            ogTitle,
            ogDescription,
            ogImage,
            robotsTxt,
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                updatedSeo,
                "Metadata and search settings updated successfully."
            )
        );
});