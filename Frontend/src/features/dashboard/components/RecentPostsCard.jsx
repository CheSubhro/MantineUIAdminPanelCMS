
import React from 'react';
import { Card, Text, Title, Group, Stack, Badge } from '@mantine/core';
import { IconArticle } from '@tabler/icons-react';

export default function RecentPostsCard({ posts = [] }) {

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: '#1a1b1e', borderColor: '#2c2e33', color: '#c1c2c5', height: '100%' }}>
            <Group justify="space-between" mb="md">
                <Title order={3} className="text-lg font-semibold text-gray-800 dark:text-white">
                    Recent Posts
                </Title>
                <IconArticle size={20} className="text-gray-500" />
            </Group>

            <Stack gap="sm">
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={index} className="p-3 rounded-md" style={{ backgroundColor: '#141517', border: '1px solid #2c2e33' }}>
                            <Group justify="space-between" align="flex-start" mb={4}>
                                <Text size="sm" fw={600} c="white">
                                    {post.title}
                                </Text>
                                <Badge size="sm" color="green" variant="light">
                                    {post.status || 'Published'}
                                </Badge>
                            </Group>
                            <Group justify="space-between">
                                <Text size="xs" c="dimmed">
                                    By {post.author}
                                </Text>
                                <Text size="xs" c="dimmed">
                                    {post.date}
                                </Text>
                            </Group>
                        </div>
                    ))
                ) : (
                    <Text size="sm" c="dimmed" className="py-4 text-center">
                        No recent posts found.
                    </Text>
                )}
            </Stack>
        </Card>
    );
}