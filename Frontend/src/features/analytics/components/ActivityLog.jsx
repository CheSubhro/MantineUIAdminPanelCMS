
import { SimpleGrid, Title, Timeline, Text, Group, Table } from '@mantine/core';
import { IconGitCommit, IconUserCheck } from '@tabler/icons-react';
import { Card, Badge } from '../../../components/common';

export function ActivityLog({ recentActivity, activeAuthors }) {
    
    return (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            {/* Recent Activity */}
            <Card withBorder p="md" radius="md">
                <Title order={5} mb="lg">Recent Activity / Audit Log</Title>
                <Timeline active={recentActivity.length - 1} bulletSize={24} lineWidth={2}>
                    {recentActivity.map((act) => (
                        <Timeline.Item key={act.id} bullet={<IconGitCommit size={12} />} title={act.action}>
                            <Text size="sm" c="dimmed">{act.target} - by <b>{act.user}</b></Text>
                            <Badge color="gray" variant="light" size="xs" mt={4}>{act.time}</Badge>
                        </Timeline.Item>
                    ))}
                </Timeline>
            </Card>

            {/* Active Authors */}
            <Card withBorder p="md" radius="md">
                <Title order={5} mb="md">Active Authors</Title>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Author Name</Table.Th>
                            <Table.Th ta="center">Posts</Table.Th>
                            <Table.Th ta="right">Total Views</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {activeAuthors.map((author) => (
                            <Table.Tr key={author.name}>
                                <Table.Td>
                                    <Group spacing="sm">
                                        <IconUserCheck size={16} />
                                        <Text size="sm" fw={500}>{author.name}</Text>
                                    </Group>
                                </Table.Td>
                                <Table.Td ta="center"><Badge color="teal" variant="light">{author.postsCount}</Badge></Table.Td>
                                <Table.Td ta="right"><Text size="sm">{author.totalViews.toLocaleString()}</Text></Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>
        </SimpleGrid>
    );
}