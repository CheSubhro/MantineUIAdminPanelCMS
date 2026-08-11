
import { useState, useMemo } from 'react';

const MOCK_DATA_SETS = {
    '7days': {
        metrics: { totalViews: 45230, uniqueVisitors: 12450, totalPosts: 24, totalPages: 8, totalUsers: 12 },
        trafficOverTime: [
            { date: 'Mon', views: 3200, visitors: 1100 },
            { date: 'Tue', views: 4100, visitors: 1400 },
            { date: 'Wed', views: 3800, visitors: 1300 },
            { date: 'Thu', views: 5200, visitors: 1800 },
            { date: 'Fri', views: 4900, visitors: 1650 },
            { date: 'Sat', views: 6100, visitors: 2100 },
            { date: 'Sun', views: 5800, visitors: 1950 },
        ]
    },
    '30days': {
        metrics: { totalViews: 185000, uniqueVisitors: 49200, totalPosts: 24, totalPages: 8, totalUsers: 12 },
        trafficOverTime: [
            { date: 'Week 1', views: 41200, visitors: 12300 },
            { date: 'Week 2', views: 46500, visitors: 13100 },
            { date: 'Week 3', views: 48900, visitors: 14000 },
            { date: 'Week 4', views: 48400, visitors: 13800 },
        ]
    },
    '1year': {
        metrics: { totalViews: 920000, uniqueVisitors: 210000, totalPosts: 24, totalPages: 8, totalUsers: 12 },
        trafficOverTime: [
            { date: 'Q1', views: 210000, visitors: 52000 },
            { date: 'Q2', views: 240000, visitors: 58000 },
            { date: 'Q3', views: 220000, visitors: 50000 },
            { date: 'Q4', views: 250000, visitors: 50000 },
        ]
    }
};

const STATIC_ANALYTICS_DATA = {
    trafficSources: [
        { source: 'Search Engines', percentage: 45, color: '#228be6' },
        { source: 'Direct', percentage: 25, color: '#40c057' },
        { source: 'Social Media', percentage: 20, color: '#fab005' },
        { source: 'Referral', percentage: 10, color: '#7950f2' },
    ],
    popularPosts: [
        { id: '1', title: 'Mastering React and Vite for Fast Development', views: 4230, comments: 34, category: 'Technology' },
        { id: '2', title: 'Top 10 Productivity Tips for Remote Developers', views: 3850, comments: 28, category: 'Lifestyle' },
        { id: '3', title: 'Understanding State Management in Mantine UI', views: 2920, comments: 19, category: 'Development' },
    ],
    topCategories: [
        { category: 'Technology', count: 12, views: 18500 },
        { category: 'Lifestyle', count: 7, views: 12400 },
        { category: 'Development', count: 5, views: 9800 },
    ],
    activeAuthors: [
        { name: 'Subhro Mondal', postsCount: 14, totalViews: 28400 },
        { name: 'John Doe', postsCount: 10, totalViews: 16830 },
    ],
    recentActivity: [
        { id: '1', action: 'Created new post', target: 'Mastering React and Vite', user: 'Subhro Mondal', time: '2 hours ago' },
        { id: '2', action: 'Updated page', target: 'Privacy Policy', user: 'Admin', time: '5 hours ago' },
        { id: '3', action: 'Deleted post', target: 'Old CSS Tricks', user: 'John Doe', time: '1 day ago' },
    ]
};

export function useAnalytics() {
    const [timeRange, setTimeRange] = useState('7days'); // '7days' | '30days' | '1year'
    const [loading, setLoading] = useState(false);

    const currentDataSet = useMemo(() => {
        return MOCK_DATA_SETS[timeRange] || MOCK_DATA_SETS['7days'];
    }, [timeRange]);

    return {
        metrics: currentDataSet.metrics,
        trafficOverTime: currentDataSet.trafficOverTime,
        trafficSources: STATIC_ANALYTICS_DATA.trafficSources,
        popularPosts: STATIC_ANALYTICS_DATA.popularPosts,
        topCategories: STATIC_ANALYTICS_DATA.topCategories,
        activeAuthors: STATIC_ANALYTICS_DATA.activeAuthors,
        recentActivity: STATIC_ANALYTICS_DATA.recentActivity,
        timeRange,
        setTimeRange,
        loading,
    };
}