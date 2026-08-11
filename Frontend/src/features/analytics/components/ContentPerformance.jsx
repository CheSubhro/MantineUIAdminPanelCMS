
import { SimpleGrid, Title, Table, Text } from '@mantine/core';
import { Card, Badge } from '../../../components/common';

export function ContentPerformance({ popularPosts, topCategories }) {
    
    return (
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            {/* Most Popular Posts */}
            <Card withBorder p="md" radius="md">
                <Title order={5} mb="md">Most Popular Posts</Title>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Title</Table.Th>
                            <Table.Th>Category</Table.Th>
                            <Table.Th ta="right">Views</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {popularPosts.map((post) => (
                            <Table.Tr key={post.id}>
                                <Table.Td><Text size="sm" truncate w={180}>{post.title}</Text></Table.Td>
                                <Table.Td><Badge color="blue" variant="light" size="sm">{post.category}</Badge></Table.Td>
                                <Table.Td ta="right"><Text size="sm" fw={500}>{post.views.toLocaleString()}</Text></Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>

            {/* Top Categories */}
            <Card withBorder p="md" radius="md">
                <Title order={5} mb="md">Top Categories</Title>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Category</Table.Th>
                            <Table.Th ta="center">Posts Count</Table.Th>
                            <Table.Th ta="right">Total Views</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {topCategories.map((cat) => (
                            <Table.Tr key={cat.category}>
                                <Table.Td><Badge color="violet" variant="outline">{cat.category}</Badge></Table.Td>
                                <Table.Td ta="center"><Text size="sm">{cat.count}</Text></Table.Td>
                                <Table.Td ta="right"><Text size="sm">{cat.views.toLocaleString()}</Text></Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Card>
        </SimpleGrid>
    );
}