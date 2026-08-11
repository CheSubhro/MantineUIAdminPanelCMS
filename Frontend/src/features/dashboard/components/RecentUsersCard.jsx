
import React from 'react';
import { Card } from '../../../components/common';
import { Title, Text, Group, Stack, Avatar, Badge } from '@mantine/core';
import { IconUsers } from '@tabler/icons-react';

export default function RecentUsersCard({ users = [] }) {

    const defaultUsers = [
        { id: 1, name: "Alex Johnson", email: "alex@example.com", status: "New" },
        { id: 2, name: "Sarah Smith", email: "sarah@example.com", status: "New" },
        { id: 3, name: "Michael Brown", email: "michael@example.com", status: "Active" }
    ];

    const displayUsers = users?.length > 0 ? users : defaultUsers;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: '#1a1b1e', borderColor: '#2c2e33', color: '#c1c2c5', height: '100%' }}>
            <Group justify="space-between" mb="md" align="center">
                <Title order={3} className="text-lg font-semibold text-gray-800 dark:text-white">
                    Recent Users
                </Title>
                <IconUsers size={20} className="text-gray-500" />
            </Group>

            <Stack className="divide-y divide-gray-800" gap={0}>
                {displayUsers.length > 0 ? (
                    displayUsers.map((user) => (
                        <Group key={user.id || user.email} justify="space-between" align="center" className="py-3">
                            <Group gap="sm">
                                <Avatar color="blue" radius="xl">
                                    {user.name ? user.name.charAt(0) : 'U'}
                                </Avatar>
                                <div>
                                    <Text size="sm" fw={500} c="white">
                                        {user.name}
                                    </Text>
                                    <Text size="xs" c="dimmed">
                                        {user.email}
                                    </Text>
                                </div>
                            </Group>
                            <Badge
                                color={user.status === 'Active' ? 'green' : 'cyan'}
                                variant="light"
                                size="sm"
                            >
                                {user.status || 'New'}
                            </Badge>
                        </Group>
                    ))
                ) : (
                    <Text size="sm" c="dimmed" className="py-4 text-center">
                        No recent users found.
                    </Text>
                )}
            </Stack>
        </Card>
    );
}