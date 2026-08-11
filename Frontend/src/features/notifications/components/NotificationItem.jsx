
import { Group, Text, ActionIcon } from '@mantine/core';
import { IconCheck, IconTrash } from '@tabler/icons-react';
import { Card, Badge, Tooltip } from '../../../components/common'; 

export function NotificationItem({ item, onMarkAsRead, onDelete }) {
    return (
        <Card
            p="md"
            withBorder
            style={{ backgroundColor: item.unread ? 'var(--mantine-color-default-hover)' : 'transparent' }}
        >
            <Group justify="between">
                <div>
                    <Group gap="xs" mb={4}>
                        <Text fw={item.unread ? 600 : 400}>{item.title}</Text>
                        {item.unread && <Badge size="xs" color="blue">New</Badge>}
                    </Group>
                    <Text size="sm" c="dimmed">{item.description}</Text>
                    <Text size="xs" c="blue" mt={4}>{item.time}</Text>
                </div>
                <Group gap="xs">
                    {item.unread && (
                        <Tooltip label="Mark as read">
                            <ActionIcon variant="subtle" color="blue" onClick={() => onMarkAsRead(item.id)}>
                                <IconCheck size={16} />
                            </ActionIcon>
                        </Tooltip>
                    )}
                    <Tooltip label="Delete notification">
                        <ActionIcon variant="subtle" color="red" onClick={() => onDelete(item.id)}>
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Group>
        </Card>
    );
}