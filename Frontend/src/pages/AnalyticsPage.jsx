
import { Container, Title, Group, Stack } from '@mantine/core';
import { useAnalytics } from '../hooks/useAnalytics';
import { AnalyticsCards } from '../features/analytics/components/AnalyticsCards';
import { TrafficChart } from '../features/analytics/components/TrafficChart';
import { ContentPerformance } from '../features/analytics/components/ContentPerformance';
import { ActivityLog } from '../features/analytics/components/ActivityLog';
import { ErrorBoundary, Spinner, CustomSelect } from '../components/common';
import { validateTimeRange } from '../utils/validators';

export function AnalyticsPage() {
    
    const {
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
    } = useAnalytics();

    if (loading) {
        return <Spinner fullScreen text="Loading Analytics..." />;
    }

    return (
        <ErrorBoundary>
            <Container fluid py="md">
                <Group justify="space-between" mb="lg">
                    <Title order={2}>Analytics Dashboard</Title>
                    <CustomSelect
                        value={validateTimeRange(timeRange)}
                        onChange={(val) => setTimeRange(validateTimeRange(val))}
                        data={[
                            { value: '7days', label: 'Last 7 Days' },
                            { value: '30days', label: 'Last 30 Days' },
                            { value: '3months', label: 'Last 3 Months' },
                            { value: 'year', label: 'This Year' },
                        ]}
                        w={180}
                    />
                </Group>

                <Stack spacing="lg">
                    <AnalyticsCards metrics={metrics} />
                    <TrafficChart trafficOverTime={trafficOverTime} trafficSources={trafficSources} />
                    <ContentPerformance popularPosts={popularPosts} topCategories={topCategories} />
                    <ActivityLog recentActivity={recentActivity} activeAuthors={activeAuthors} />
                </Stack>
            </Container>
        </ErrorBoundary>
    );
}

export default AnalyticsPage;