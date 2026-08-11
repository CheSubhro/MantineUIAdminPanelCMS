
import { useState, useMemo, useCallback } from 'react';

export function useReports(initialData = {}) {
    
    const [reportType, setReportType] = useState('post-performance');
    const [timeRange, setTimeRange] = useState('30days');
    const [customDateRange, setCustomDateRange] = useState({ from: '', to: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for spinner

    // Mock/Initial raw data sources
    const posts = initialData.posts || [
        { id: 1, title: 'Mastering React and Vite', author: 'Subhro Mondal', category: 'Development', views: 12450, engagement: '85%', date: '2026-06-15' },
        { id: 2, title: 'Mantine UI Best Practices', author: 'Siltu', category: 'Design', views: 8320, engagement: '78%', date: '2026-06-20' },
        { id: 3, title: 'Advanced State Management', author: 'Subhro Mondal', category: 'Development', views: 9540, engagement: '82%', date: '2026-07-01' },
    ];

    const activities = initialData.activities || [
        { id: 1, user: 'Subhro Mondal', action: 'Created Post', target: 'Mastering React and Vite', timestamp: '2026-07-28 10:30 AM' },
        { id: 2, user: 'Siltu', action: 'Updated Settings', target: 'General Config', timestamp: '2026-07-29 02:15 PM' },
    ];

    const trafficData = initialData.trafficData || {
        totalViews: 45230,
        uniqueVisitors: 12450,
        sources: [
            { source: 'Search Engines', percentage: 45 },
            { source: 'Direct', percentage: 25 },
            { source: 'Social Media', percentage: 20 },
            { source: 'Referral', percentage: 10 },
        ]
    };

    // Filter handlers with simulated async loading effect for the Spinner
    const handleSetReportType = useCallback((type) => {
        setLoading(true);
        setReportType(type);
        setTimeout(() => setLoading(false), 300); // Simulated loading delay
    }, []);

    const handleSetTimeRange = useCallback((range) => {
        setLoading(true);
        setTimeRange(range);
        setTimeout(() => setLoading(false), 300);
    }, []);

    // Report Computations
    const postPerformanceReport = useMemo(() => {
        return posts.filter(post => 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [posts, searchQuery]);

    const authorContributionReport = useMemo(() => {
        const authorMap = {};
        posts.forEach(post => {
            if (!authorMap[post.author]) {
                authorMap[post.author] = { author: post.author, totalPosts: 0, totalViews: 0 };
            }
            authorMap[post.author].totalPosts += 1;
            authorMap[post.author].totalViews += post.views;
        });
        return Object.values(authorMap).filter(item => 
            item.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [posts, searchQuery]);

    const categoryBreakdownReport = useMemo(() => {
        const categoryMap = {};
        posts.forEach(post => {
            if (!categoryMap[post.category]) {
                categoryMap[post.category] = { category: post.category, count: 0, views: 0 };
            }
            categoryMap[post.category].count += 1;
            categoryMap[post.category].views += post.views;
        });
        return Object.values(categoryMap).filter(item => 
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [posts, searchQuery]);

    const userActivityReport = useMemo(() => {
        return activities.filter(act => 
            act.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            act.action.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [activities, searchQuery]);

    const currentReportData = useMemo(() => {
        switch (reportType) {
            case 'post-performance':
                return postPerformanceReport;
            case 'author-contribution':
                return authorContributionReport;
            case 'category-breakdown':
                return categoryBreakdownReport;
            case 'traffic-summary':
                return [trafficData];
            case 'activity-log':
                return userActivityReport;
            default:
                return [];
        }
    }, [reportType, postPerformanceReport, authorContributionReport, categoryBreakdownReport, trafficData, userActivityReport]);

    const exportAsCSV = useCallback((fileName = 'report.csv') => {
        if (!currentReportData.length) return;
        
        const headers = Object.keys(currentReportData[0]);
        const csvRows = [
            headers.join(','),
            ...currentReportData.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
        ];
        
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', fileName);
        a.click();
        window.URL.revokeObjectURL(url);
    }, [currentReportData]);

    const exportAsPDF = useCallback(() => {
        window.print();
    }, []);

    return {
        reportType,
        setReportType: handleSetReportType,
        timeRange,
        setTimeRange: handleSetTimeRange,
        customDateRange,
        setCustomDateRange,
        searchQuery,
        setSearchQuery,
        currentReportData,
        loading,
        exportAsCSV,
        exportAsPDF,
    };
}