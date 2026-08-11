
import React from 'react';
import { Stack, Grid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../hooks/useDashboard';
import DashboardHeader from '../features/dashboard/components/DashboardHeader';
import DashboardMetrics from '../features/dashboard/components/DashboardMetrics';
import TrafficChartCard from '../features/dashboard/components/TrafficChartCard';
import TrafficSourcesCard from '../features/dashboard/components/TrafficSourcesCard';
import TopPostsBarChart from '../features/dashboard/components/TopPostsBarChart';
import CategoriesChartCard from '../features/dashboard/components/CategoriesChartCard';
import RecentPostsCard from '../features/dashboard/components/RecentPostsCard';
import RecentUsersCard from '../features/dashboard/components/RecentUsersCard';
import RecentActivityCard from '../features/dashboard/components/RecentActivityCard';
import { Spinner } from '../components/common';

export default function DashboardPage() {
    const {
        metrics,
        trafficSources,
        categoriesData,
        topPosts,
        recentPosts,
        recentActivity,
        recentUsers,
        timeRange,
        setTimeRange,
        loading
    } = useDashboard();

    const navigate = useNavigate();

    const handleNewPost = () => {
        navigate('/posts');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <Stack gap="lg" p="md">
            {/* Header */}
            <DashboardHeader
                title="Dashboard Overview"
                subtitle="Welcome back, here is what’s happening with your CMS today."
                onNewPost={handleNewPost}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
            />

            {/* Metric Cards */}
            <DashboardMetrics metrics={metrics} />

            {/* Analytics Charts Section (Part 1: Traffic Overview & Sources) */}
            <Grid gutter="lg">
                <Grid.Col xs={12} lg={8}>
                    <TrafficChartCard />
                </Grid.Col>
                <Grid.Col xs={12} lg={4}>
                    <TrafficSourcesCard trafficSources={trafficSources} />
                </Grid.Col>
            </Grid>

            {/* Analytics Charts Section (Part 2: Top Posts & Categories Side-by-Side) */}
            <div style={{ display: 'flex', gap: '20px', width: '100%', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 65%', minWidth: '300px' }}>
                    <TopPostsBarChart topPosts={topPosts} />
                </div>
                <div style={{ flex: '1 1 30%', minWidth: '300px' }}>
                    <CategoriesChartCard categoriesData={categoriesData} />
                </div>
            </div>

            {/* Recent Activities & Lists Section */}
            <Grid gutter="lg">
                <Grid.Col xs={12} md={6}>
                    <RecentPostsCard posts={recentPosts} />
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <RecentUsersCard users={recentUsers} />
                </Grid.Col>
            </Grid>

            {/* Audit Logs / System Activity Section */}
            <Grid gutter="lg">
                <Grid.Col xs={12}>
                    <RecentActivityCard activities={recentActivity} />
                </Grid.Col>
            </Grid>
        </Stack>
    );
}