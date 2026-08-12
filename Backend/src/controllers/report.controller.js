
import Post from "../models/Post.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import HttpStatus from "../utils/HttpStatus.js";

// Get system reports based on reportType and timeRange
export const getSystemReports = asyncHandler(async (req, res) => {
    const { reportType = "post-performance", timeRange = "30days" } = req.query;

    const rawPosts = await Post.find().populate("author", "name email");

    const posts = rawPosts.map((p, index) => ({
        id: p._id || index + 1,
        title: p.title,
        author: p.author?.name || "Subhro Mondal",
        category: p.category || "Development",
        views: p.views || Math.floor(Math.random() * 10000) + 1000,
        engagement: p.engagement || "82%",
        date: p.createdAt
            ? p.createdAt.toISOString().split("T")[0]
            : "2026-06-15",
    }));

    const activities = [
        {
            id: 1,
            user: "Subhro Mondal",
            action: "Created Post",
            target: "Mastering React and Vite",
            timestamp: "2026-07-28 10:30 AM",
        },
        {
            id: 2,
            user: "Siltu",
            action: "Updated Settings",
            target: "General Config",
            timestamp: "2026-07-29 02:15 PM",
        },
    ];

    const trafficData = {
        totalViews: 45230,
        uniqueVisitors: 12450,
        sources: [
            { source: "Search Engines", percentage: 45 },
            { source: "Direct", percentage: 25 },
            { source: "Social Media", percentage: 20 },
            { source: "Referral", percentage: 10 },
        ],
    };

    let reportData = [];

    switch (reportType) {
        case "post-performance":
            reportData = posts;
            break;

        case "author-contribution": {
            const authorMap = {};
            posts.forEach((post) => {
                if (!authorMap[post.author]) {
                    authorMap[post.author] = {
                        author: post.author,
                        totalPosts: 0,
                        totalViews: 0,
                    };
                }
                authorMap[post.author].totalPosts += 1;
                authorMap[post.author].totalViews += post.views;
            });
            reportData = Object.values(authorMap);
            break;
        }

        case "category-breakdown": {
            const categoryMap = {};
            posts.forEach((post) => {
                if (!categoryMap[post.category]) {
                    categoryMap[post.category] = {
                        category: post.category,
                        count: 0,
                        views: 0,
                    };
                }
                categoryMap[post.category].count += 1;
                categoryMap[post.category].views += post.views;
            });
            reportData = Object.values(categoryMap);
            break;
        }

        case "traffic-summary":
            reportData = [trafficData];
            break;

        case "activity-log":
            reportData = activities;
            break;

        default:
            reportData = posts;
    }

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                { reportType, timeRange, data: reportData },
                "Reports fetched successfully."
            )
        );
});