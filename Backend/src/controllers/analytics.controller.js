
import Post from "../models/Post.model.js";
import Page from "../models/Page.model.js";
import User from "../models/User.model.js";
// যদি আপনার আলাদা AuditLog বা Activity মডেল থাকে, তবে সেটি এখানে ইমોર્ટ করবেন
// import Activity from "../models/activity.model.js";

// Helper function to calculate date range based on query parameter
const getDateRangeFilter = (period) => {
    const now = new Date();
    let startDate = new Date();

    switch (period) {
        case "7days":
            startDate.setDate(now.getDate() - 7);
            break;
        case "30days":
            startDate.setDate(now.getDate() - 30);
            break;
        case "1year":
            startDate.setFullYear(now.getFullYear() - 1);
            break;
        default:
            startDate.setDate(now.getDate() - 30); 
    }
    return startDate;
};

// Get Dashboard Metrics (Totals & Aggregations)
export const getDashboardMetrics = async (req, res) => {
    try {
        const { period = "30days" } = req.query;
        const startDate = getDateRangeFilter(period);

        const totalPosts = await Post.countDocuments();
        const totalPages = await Page.countDocuments();
        const totalUsers = await User.countDocuments();

        const postStats = await Post.aggregate([
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: "$views" },
                    totalUniqueVisitors: { $sum: "$uniqueVisitors" },
                },
            },
        ]);

        const views = postStats.length > 0 ? postStats[0].totalViews : 0;
        const uniqueVisitors =
            postStats.length > 0 ? postStats[0].totalUniqueVisitors : 0;

        res.status(200).json({
            success: true,
            data: {
                views,
                uniqueVisitors,
                totalPosts,
                totalPages,
                totalUsers,
                period,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Traffic Over Time (Time-series data for charts)
export const getTrafficOverTime = async (req, res) => {
    try {
        const { period = "30days" } = req.query;
        const startDate = getDateRangeFilter(period);

        const trafficData = await Post.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                        },
                    },
                    views: { $sum: "$views" },
                    visitors: { $sum: "$uniqueVisitors" },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.status(200).json({
            success: true,
            data: trafficData,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Traffic Sources (Breakdown with percentages)
export const getTrafficSources = async (req, res) => {
    try {
        const sources = [
            { source: "Search Engines", visits: 4500, percentage: 45 },
            { source: "Direct", visits: 2500, percentage: 25 },
            { source: "Social Media", visits: 2000, percentage: 20 },
            { source: "Referral", visits: 1000, percentage: 10 },
        ];

        res.status(200).json({
            success: true,
            data: sources,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Popular Posts (Top-performing posts sorted by views)
export const getPopularPosts = async (req, res) => {
    try {
        const popularPosts = await Post.find()
            .sort({ views: -1 })
            .limit(5)
            .select("title views categories commentsCount createdAt");

        res.status(200).json({
            success: true,
            data: popularPosts,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Top Categories (Category-wise post counts and views)
export const getTopCategories = async (req, res) => {
    try {
        const categoryStats = await Post.aggregate([
            {
                $unwind: "$categories", 
            },
            {
                $group: {
                    _id: "$categories",
                    postCount: { $sum: 1 },
                    totalViews: { $sum: "$views" },
                },
            },
            {
                $sort: { totalViews: -1 },
            },
            {
                $limit: 5,
            },
        ]);

        res.status(200).json({
            success: true,
            data: categoryStats,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Active Authors (Author statistics)
export const getActiveAuthors = async (req, res) => {
    try {
        const authorStats = await Post.aggregate([
            {
                $group: {
                    _id: "$author",
                    totalPosts: { $sum: 1 },
                    accumulatedViews: { $sum: "$views" },
                },
            },
            {
                $sort: { accumulatedViews: -1 },
            },
            {
                $limit: 5,
            },
        ]);

        res.status(200).json({
            success: true,
            data: authorStats,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Recent Activity (Audit logs / System actions)
export const getRecentActivity = async (req, res) => {
    try {
        // const activities = await Activity.find().sort({ createdAt: -1 }).limit(10);

        const recentPosts = await Post.find()
            .sort({ updatedAt: -1 })
            .limit(5)
            .select("title author updatedAt status");

        const activities = recentPosts.map((post) => ({
            action: `Post '${post.title}' was updated`,
            performedBy: post.author || "Admin",
            timestamp: post.updatedAt,
        }));

        res.status(200).json({
            success: true,
            data: activities,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};