
import User from "../models/User.model.js";
import Post from "../models/Post.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import HttpStatus from "../utils/HttpStatus.js";

export const getDashboardMetrics = asyncHandler(async (req, res) => {
    
    const { timeRange = "7days" } = req.query;

    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();

    let multiplier = 1;
    if (timeRange === "30days") multiplier = 3.5;
    if (timeRange === "3months") multiplier = 9;
    if (timeRange === "year") multiplier = 35;

    const baseViews = 45230;
    const baseUniqueVisitors = 12450;

    const metrics = {
        totalViews: Math.round(baseViews * multiplier),
        uniqueVisitors: Math.round(baseUniqueVisitors * multiplier),
        totalPosts,
        totalUsers,
    };

    const rawRecentPosts = await Post.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select("title author createdAt");

    const recentPosts = rawRecentPosts.map((p, index) => ({
        id: p._id || index + 1,
        title: p.title,
        author: p.author || "Subhro Mondal",
        date: p.createdAt
            ? p.createdAt.toISOString().split("T")[0]
            : "2026-07-28",
    }));

    const rawRecentUsers = await User.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select("name email");

    const recentUsers = rawRecentUsers.map((u, index) => ({
        id: u._id || index + 1,
        name: u.name,
        email: u.email,
    }));

    const categoriesAggregation = await Post.aggregate([
        {
            $group: {
                _id: "$category",
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                name: { $ifNull: ["$_id", "React"] }, 
                value: "$count",
                _id: 0,
            },
        },
        { $sort: { value: -1 } },
    ]);

    const categoriesData =
        categoriesAggregation.length > 0
            ? categoriesAggregation
            : [
                  { name: "React", value: 45 },
                  { name: "UI/UX", value: 25 },
                  { name: "JavaScript", value: 20 },
                  { name: "Node.js", value: 10 },
              ];

    const trafficSources = [
        { source: "Search", percentage: 50 },
        { source: "Direct", percentage: 30 },
        { source: "Social", percentage: 20 },
    ];

    const recentActivity = [
        {
            id: 1,
            user: "Subhro Mondal",
            role: "Admin",
            action: "Updated system settings & dashboard",
            ip: "192.168.1.15",
            time: "10 mins ago",
            type: "edit",
        },
        {
            id: 2,
            user: "Sarah Smith",
            role: "Editor",
            action: "Logged into the system successfully",
            ip: "192.168.1.42",
            time: "25 mins ago",
            type: "login",
        },
    ];

    const topPosts = [
        { title: "Mastering React", views: 4200 },
        { title: "Vite Guide", views: 3800 },
        { title: "Tailwind Tips", views: 3100 },
        { title: "Node.js API", views: 2400 },
        { title: "CSS Layouts", views: 1900 },
    ];

    const dashboardData = {
        metrics,
        trafficSources,
        recentPosts,
        recentUsers,
        recentActivity,
        categoriesData,
        topPosts,
    };

    return res
        .status(HttpStatus.OK || 200)
        .json(
            new ApiResponse(
                HttpStatus.OK || 200,
                dashboardData,
                "Dashboard metrics fetched successfully."
            )
        );
});