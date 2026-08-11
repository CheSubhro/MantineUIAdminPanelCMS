
import { useState, useEffect } from 'react';
import { validateTimeRange } from '../utils/validators'; 

export const useDashboard = () => {
    const [timeRange, setTimeRange] = useState('7days');

    const [metrics, setMetrics] = useState({
        totalViews: 45230,
        uniqueVisitors: 12450,
        totalPosts: 24,
        totalUsers: 142
    });

    const [trafficSources, setTrafficSources] = useState([
        { source: 'Search', percentage: 50 },
        { source: 'Direct', percentage: 30 },
        { source: 'Social', percentage: 20 }
    ]);

    const [recentPosts, setRecentPosts] = useState([
        { id: 1, title: 'Mastering React and Vite', author: 'Subhro Mondal', date: '2026-07-28' },
        { id: 2, title: 'Building Scalable UI Components', author: 'Admin User', date: '2026-07-26' },
        { id: 3, title: 'Understanding Form Validation in React', author: 'Subhro Mondal', date: '2026-07-25' }
    ]);

    const [recentUsers, setRecentUsers] = useState([
        { id: 1, name: 'Alex Johnson', email: 'alex@example.com' },
        { id: 2, name: 'Sarah Smith', email: 'sarah@example.com' },
        { id: 3, name: 'Michael Brown', email: 'michael@example.com' }
    ]);

    const [recentActivity, setRecentActivity] = useState([
        { 
            id: 1, 
            user: 'Subhro Mondal', 
            role: 'Admin', 
            action: 'Updated post "Mastering React and Vite"', 
            ip: '192.168.1.15', 
            time: '10 mins ago',
            type: 'edit' 
        },
        { 
            id: 2, 
            user: 'Sarah Smith', 
            role: 'Editor', 
            action: 'Logged into the system successfully', 
            ip: '192.168.1.42', 
            time: '25 mins ago',
            type: 'login' 
        },
        { 
            id: 3, 
            user: 'Admin Root', 
            role: 'Super Admin', 
            action: 'Deleted post ID #18 ("Old CSS Tricks")', 
            ip: '10.0.0.8', 
            time: '1 hour ago',
            type: 'delete' 
        }
    ]);

    const [categoriesData, setCategoriesData] = useState([
        { name: 'React', value: 45 },
        { name: 'UI/UX', value: 25 },
        { name: 'JavaScript', value: 20 },
        { name: 'Node.js', value: 10 }
    ]);

    const [topPosts, setTopPosts] = useState([
        { title: 'Mastering React', views: 4200 },
        { title: 'Vite Guide', views: 3800 },
        { title: 'Tailwind Tips', views: 3100 },
        { title: 'Node.js API', views: 2400 },
        { title: 'CSS Layouts', views: 1900 }
    ]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const validRange = validateTimeRange(timeRange);
        setLoading(true);

        const timer = setTimeout(() => {
            let multiplier = 1;
            if (validRange === '30days') multiplier = 3.5;
            if (validRange === '3months') multiplier = 9;
            if (validRange === 'year') multiplier = 35;

            setMetrics({
                totalViews: Math.round(45230 * multiplier),
                uniqueVisitors: Math.round(12450 * multiplier),
                totalPosts: 24,
                totalUsers: 142
            });

            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [timeRange]);

    return {
        metrics,
        trafficSources,
        recentPosts,
        recentUsers,
        recentActivity, 
        categoriesData, 
        topPosts,
        timeRange,
        setTimeRange: (val) => setTimeRange(validateTimeRange(val)),
        loading
    };
};