
import { Container, Title, Group, Stack } from '@mantine/core';
import { IconSearch, IconCheck } from '@tabler/icons-react';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationItem } from '../features/notifications/components/NotificationItem';
import {
    Button,
    Input,
    EmptyState,
    Pagination,
    ErrorBoundary
} from '../components/common'; 

export default function NotificationsPage() {
    const {
        notifications,
        searchQuery,
        setSearchQuery,
        markAsRead,
        markAllAsRead,
        deleteNotification
    } = useNotifications();

    return (
        <ErrorBoundary>
            <Container size="lg" py="md">
                <Group justify="between" mb="lg">
                    <Title order={2}>Notifications Center</Title>
                    <Button variant="light" onClick={markAllAsRead} leftSection={<IconCheck size={16} />}>
                        Mark all as read
                    </Button>
                </Group>

                <Input
                    placeholder="Search notifications..."
                    mb="md"
                    leftSection={<IconSearch size={16} />}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <Stack gap="sm">
                    {notifications.length > 0 ? (
                        notifications.map((item) => (
                            <NotificationItem
                                key={item.id}
                                item={item}
                                onMarkAsRead={markAsRead}
                                onDelete={deleteNotification}
                            />
                        ))
                    ) : (
                        <EmptyState
                            title="No notifications found"
                            description="You're all caught up! There are no matching notifications to display."
                        />
                    )}
                </Stack>

                {notifications.length > 0 && (
                    <Group justify="center" mt="xl">
                        <Pagination total={1} value={1} onChange={() => { }} />
                    </Group>
                )}
            </Container>
        </ErrorBoundary>
    );
}