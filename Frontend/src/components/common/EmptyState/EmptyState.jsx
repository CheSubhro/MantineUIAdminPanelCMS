
import { Stack, Text, Button, Center } from '@mantine/core';
import { IconInbox } from '@tabler/icons-react';

export default function EmptyState({
    title = "No data found",
    description,
    icon,
    actionText,
    onAction,
    actionColor
}) {
    return (
        <Center py="xl">
            <Stack align="center" gap="xs">
                {icon ? icon : <IconInbox size={48} stroke={1.5} color="gray" />}

                <Text fw={500} size="lg">{title}</Text>
                {description && <Text c="dimmed" size="sm" ta="center" maw={300}>{description}</Text>}
                {actionText && onAction && (
                    <Button mt="md" onClick={onAction} size="sm" color={actionColor}>
                        {actionText}
                    </Button>
                )}
            </Stack>
        </Center>
    );
}