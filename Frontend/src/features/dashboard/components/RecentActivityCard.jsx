
import React from 'react';
import { Card } from '../../../components/common';
import { Title, Text, Group, Stack, Badge } from '@mantine/core';

export default function RecentActivityCard({ activities = [] }) {

    const defaultActivities = [
        {
            id: 1,
            user: "Subhro Mondal",
            role: "Admin",
            action: 'Updated post "Mastering React and Vite"',
            ip: "192.168.1.15",
            time: "10 mins ago",
            type: "edit"
        },
        {
            id: 2,
            user: "Sarah Smith",
            role: "Editor",
            action: "Logged into the system successfully",
            ip: "192.168.1.42",
            time: "25 mins ago",
            type: "login"
        },
        {
            id: 3,
            user: "Admin Root",
            role: "Super Admin",
            action: 'Deleted post ID #18 ("Old CSS Tricks")',
            ip: "10.0.0.8",
            time: "1 hour ago",
            type: "delete"
        }
    ];

    const displayActivities = activities?.length > 0 ? activities : defaultActivities;

    const getBadgeColor = (type) => {
        switch (type) {
            case 'edit':
                return 'blue';
            case 'delete':
                return 'red';
            case 'login':
                return 'green';
            default:
                return 'gray';
        }
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: '#1a1b1e', borderColor: '#2c2e33', color: '#c1c2c5', height: '100%' }}>
            <div className="flex justify-between items-center mb-4">
                <Title order={3} className="text-lg font-semibold text-gray-800 dark:text-white">
                    System Audit Logs & Activity History
                </Title>
                <Badge color="blue" variant="light">Real-time</Badge>
            </div>

            <Stack className="divide-y divide-gray-800" gap={0}>
                {displayActivities.length > 0 ? (
                    displayActivities.map((item) => (
                        <div key={item.id} className="py-3 flex justify-between items-center">
                            <div>
                                <Group gap="xs" align="center">
                                    <Text size="sm" fw={600} c="white">
                                        {item.user}
                                    </Text>
                                    <span className="text-xs px-1.5 py-0.5 bg-zinc-800 text-gray-400 rounded border border-zinc-700">
                                        {item.role}
                                    </span>
                                </Group>
                                <Text size="sm" className="text-gray-300 mt-1">
                                    {item.action}
                                </Text>
                                <Group gap="md" mt={2}>
                                    <Text size="xs" c="dimmed">
                                        IP: {item.ip}
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {item.time}
                                    </Text>
                                </Group>
                            </div>
                            <Badge color={getBadgeColor(item.type)} variant="light" className="capitalize">
                                {item.type}
                            </Badge>
                        </div>
                    ))
                ) : (
                    <Text size="sm" c="dimmed" className="py-4 text-center">
                        No recent activity logs found.
                    </Text>
                )}
            </Stack>
        </Card>
    );
}