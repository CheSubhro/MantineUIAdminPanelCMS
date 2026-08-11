
import React from 'react';
import { Group, Title, Text, Button, Select, Badge } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { validateTimeRange } from '../../../utils/validators';

export default function DashboardHeader({
    title = "Dashboard Overview",
    subtitle = "Welcome back, Subhro! Here's what's happening with your content today.",
    onNewPost,
    timeRange,
    onTimeRangeChange
}) {
    return (
        <Group
            justify="space-between"
            mb="lg"
            align="center"
            className="p-4 rounded-xl border bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700"
        >
            <div>
                <Group gap="xs" align="center">
                    <Title order={2} className="text-xl font-bold text-gray-800 dark:text-white">
                        {title}
                    </Title>
                    <Badge color="blue" variant="light">Live</Badge>
                </Group>
                <Text size="xs" c="dimmed" mt={2}>
                    {subtitle}
                </Text>
            </div>

            <Group gap="sm">
                {/* Time Range Filter Dropdown */}
                <Select
                    value={validateTimeRange(timeRange)}
                    onChange={(val) => onTimeRangeChange(validateTimeRange(val))}
                    defaultValue="7days"
                    data={[
                        { value: '7days', label: 'Last 7 Days' },
                        { value: '30days', label: 'Last 30 Days' },
                        { value: '3months', label: 'Last 3 Months' },
                        { value: 'year', label: 'This Year' },
                    ]}
                    w={150}
                    size="sm"
                />

                {/* Quick Action Button */}
                <Button
                    leftSection={<IconPlus size={16} />}
                    color="violet"
                    size="sm"
                    onClick={onNewPost}
                >
                    New Post
                </Button>
            </Group>
        </Group>
    );
}