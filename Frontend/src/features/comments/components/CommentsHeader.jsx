
import { Group, Title, Text } from '@mantine/core';

export default function CommentsHeader() {
    return (
        <Group justify="space-between">
            <div>
                <Title order={2}>Comments Moderation</Title>
                <Text c="dimmed" size="sm">Manage and moderate user comments across posts and pages.</Text>
            </div>
        </Group>
    );
}