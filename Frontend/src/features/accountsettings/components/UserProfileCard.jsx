
import React from 'react';
import { Card, Avatar, Button, Text, Group, Stack, Divider, Box } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { Badge } from '../../../components/common';

const UserProfileCard = ({ user }) => {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack align="center" spacing="md">
                <Avatar
                    src={user?.avatar}
                    size={100}
                    radius={100}
                    color="blue"
                >
                    {user?.fullName?.charAt(0) || 'U'}
                </Avatar>

                <Button
                    variant="subtle"
                    size="xs"
                    leftSection={<IconUpload size={14} />}
                >
                    Change Avatar
                </Button>

                <Box ta="center">
                    <Text fw={700} size="lg" mt={4}>
                        {user?.fullName || 'John Doe'}
                    </Text>
                    <Text size="sm" c="dimmed">
                        @{user?.username || 'johndoe'}
                    </Text>
                </Box>

                <Badge>
                    {user?.role || 'Admin'}
                </Badge>
            </Stack>

            <Divider my="sm" />

            <Text size="xs" c="dimmed" ta="center">
                Last Login: 2 hours ago
            </Text>
        </Card>
    );
};

export default UserProfileCard;