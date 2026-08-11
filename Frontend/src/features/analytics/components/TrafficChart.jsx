
import { SimpleGrid, Title, Stack, Group, Text, Progress } from '@mantine/core';
import { Card, Badge, EmptyState } from '../../../components/common';
import { IconChartLine } from '@tabler/icons-react';

export function TrafficChart({ trafficOverTime, trafficSources }) {
    
    const hasData = trafficOverTime && trafficOverTime.length > 0;

    return (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            {/* Traffic Over Time */}
            <Card withBorder p="md" radius="md">
                <Title order={5} mb="md">Traffic & Visitor Trend</Title>
                {hasData ? (
                    <Stack spacing="xs">
                        {trafficOverTime.map((item) => (
                            <Group key={item.date} justify="space-between" py={4}>
                                <Text size="sm" w={70}>{item.date}</Text>
                                <Group spacing="lg">
                                    <Text size="sm" c="blue.6">Views: {item.views.toLocaleString()}</Text>
                                    <Text size="sm" c="teal.6">Visitors: {item.visitors.toLocaleString()}</Text>
                                </Group>
                            </Group>
                        ))}
                    </Stack>
                ) : (
                    <EmptyState title="No Traffic Data" description="No traffic logs found for this period." icon={IconChartLine} />
                )}
            </Card>

            {/* Traffic Sources */}
            <Card withBorder p="md" radius="md">
                <Title order={5} mb="md">Traffic Sources</Title>
                <Stack spacing="md" mt="xl">
                    {trafficSources.map((source) => (
                        <div key={source.source}>
                            <Group justify="space-between" mb={4}>
                                <Badge color="gray" variant="dot">{source.source}</Badge>
                                <Text size="sm" fw={500}>{source.percentage}%</Text>
                            </Group>
                            <Progress value={source.percentage} color={source.color} size="sm" radius="xl" />
                        </div>
                    ))}
                </Stack>
            </Card>
        </SimpleGrid>
    );
}