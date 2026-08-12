
import { useState, useEffect, useCallback } from 'react';
import { showToast } from '../utils/toast';
import api from '../services/api';

export function useAnalytics() {
    const [timeRange, setTimeRange] = useState('7days'); // '7days' | '30days' | '1year'
    const [loading, setLoading] = useState(false);

    // Analytics state data mapped from backend
    const [metrics, setMetrics] = useState({
        totalViews: 0,
        uniqueVisitors: 0,
        totalPosts: 0,
        totalPages: 0,
        totalUsers: 0,
    });
    const [trafficOverTime, setTrafficOverTime] = useState([]);
    const [trafficSources, setTrafficSources] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [topCategories, setTopCategories] = useState([]);
    const [activeAuthors, setActiveAuthors] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    // Fetch all analytics data based on selected timeRange/period
    const fetchAnalyticsData = useCallback(async (period) => {
        setLoading(true);
        try {
            // Parallel API calls for optimal performance
            const [
                metricsRes,
                trafficRes,
                sourcesRes,
                popularRes,
                categoriesRes,
                authorsRes,
                activityRes,
            ] = await Promise.all([
                api.get(`/analytics/metrics?period=${period}`),
                api.get(`/analytics/traffic?period=${period}`),
                api.get(`/analytics/sources?period=${period}`),
                api.get(`/analytics/popular-posts?period=${period}`),
                api.get(`/analytics/categories?period=${period}`),
                api.get(`/analytics/authors?period=${period}`),
                api.get(`/analytics/activity?period=${period}`),
            ]);

            setMetrics(metricsRes.data.data || {});
            setTrafficOverTime(trafficRes.data.data || []);
            setTrafficSources(sourcesRes.data.data || []);
            setPopularPosts(popularRes.data.data || []);
            setTopCategories(categoriesRes.data.data || []);
            setActiveAuthors(authorsRes.data.data || []);
            setRecentActivity(activityRes.data.data || []);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch analytics data.';
            showToast.error('Analytics Error', errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    // Trigger data fetch whenever timeRange changes
    useEffect(() => {
        fetchAnalyticsData(timeRange);
    }, [timeRange, fetchAnalyticsData]);

    return {
        metrics,
        trafficOverTime,
        trafficSources,
        popularPosts,
        topCategories,
        activeAuthors,
        recentActivity,
        timeRange,
        setTimeRange,
        loading,
        refetchAnalytics: () => fetchAnalyticsData(timeRange),
    };
}