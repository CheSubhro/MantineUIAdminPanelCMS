
import React from 'react';
import { Card, Badge, Text, Group, Title, SimpleGrid } from '@mantine/core';
import { Spinner } from '../../../components/common';

export default function DashboardMetrics({ metrics, loading = false }) {
    
    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Spinner size="lg" />
            </div>
        );
    }

    const cards = [
        {
            title: 'Total Views',
            value: metrics?.totalViews?.toLocaleString() || 0,
            badge: '+12%',
            color: 'green'
        },
        {
            title: 'Unique Visitors',
            value: metrics?.uniqueVisitors?.toLocaleString() || 0,
            badge: '+8.4%',
            color: 'green'
        },
        {
            title: 'Total Posts',
            value: metrics?.totalPosts || 0,
            badge: 'Active',
            color: 'blue'
        },
        {
            title: 'Total Users',
            value: metrics?.totalUsers || 0,
            badge: '+3 new',
            color: 'green'
        }
    ];

    return (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" w="100%">
            {cards.map((item, index) => (
                <Card
                    key={index}
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className="h-full flex flex-col justify-between"
                >
                    <Text size="sm" c="dimmed">
                        {item.title}
                    </Text>

                    <Group justify="space-between" align="baseline" mt="md">
                        <Title order={2}>
                            {item.value}
                        </Title>
                        <Badge color={item.color}>
                            {item.badge}
                        </Badge>
                    </Group>
                </Card>
            ))}
        </SimpleGrid>
    );
}