
import { SimpleGrid, Group, Text, ThemeIcon } from '@mantine/core';
import { IconEye, IconUsers, IconFileText, IconArticle } from '@tabler/icons-react';
import { Card, Badge } from '../../../components/common';

export function AnalyticsCards({ metrics }) {
    
    const items = [
        { title: 'Total Views', value: metrics.totalViews.toLocaleString(), icon: IconEye, color: 'blue', change: '+12%' },
        { title: 'Unique Visitors', value: metrics.uniqueVisitors.toLocaleString(), icon: IconUsers, color: 'teal', change: '+8%' },
        { title: 'Total Posts & Pages', value: (metrics.totalPosts + metrics.totalPages), icon: IconFileText, color: 'violet', change: 'Active' },
        { title: 'Total Authors', value: metrics.totalUsers, icon: IconArticle, color: 'grape', change: 'Stable' },
    ];

    return (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
            {items.map((item) => {
                const Icon = item.icon;
                return (
                    <Card withBorder p="md" radius="md" key={item.title}>
                        <Group justify="space-between" mb="xs">
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                                {item.title}
                            </Text>
                            <ThemeIcon color={item.color} variant="light" size={38} radius="md">
                                <Icon size={22} />
                            </ThemeIcon>
                        </Group>
                        <Group justify="space-between" align="flex-end">
                            <Text fw={700} size="xl">
                                {item.value}
                            </Text>
                            <Badge color={item.color} variant="light" size="sm">
                                {item.change}
                            </Badge>
                        </Group>
                    </Card>
                );
            })}
        </SimpleGrid>
    );
}