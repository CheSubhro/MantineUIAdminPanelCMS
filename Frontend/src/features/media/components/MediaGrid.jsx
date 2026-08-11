
import { SimpleGrid, Group, Text, Image, ActionIcon, Card } from '@mantine/core';
import { IconCopy, IconTrash } from '@tabler/icons-react';

export default function MediaGrid({ mediaFiles, onCopyUrl, onDelete }) {
    return (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
            {mediaFiles.map((file) => (
                <Card key={file.id} shadow="sm" padding="xs" radius="md" withBorder bg="var(--mantine-color-dark-6)">
                    <Card.Section>
                        <Image src={file.url} height={160} alt={file.name} fit="cover" />
                    </Card.Section>

                    <Group justify="space-between" align="flex-start" mt="md" pt="xs" wrap="nowrap">
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <Text size="sm" fw={500} c="white" truncate="end">{file.name}</Text>
                            <Text size="xs" c="dimmed">{file.size}</Text>
                        </div>
                        <Group gap={4} style={{ flexShrink: 0 }}>
                            <ActionIcon variant="subtle" color="blue" onClick={() => onCopyUrl(file.url)} title="Copy URL">
                                <IconCopy size={16} />
                            </ActionIcon>
                            <ActionIcon variant="subtle" color="red" onClick={() => onDelete(file.id)} title="Delete">
                                <IconTrash size={16} />
                            </ActionIcon>
                        </Group>
                    </Group>
                </Card>
            ))}
        </SimpleGrid>
    );
}