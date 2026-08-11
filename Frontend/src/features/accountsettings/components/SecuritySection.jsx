
import React from 'react';
import { Title, Text, Grid, Group, Divider, Box, PasswordInput } from '@mantine/core';
import { Card, Button, ThemeToggle } from '../../../components/common';

const SecuritySection = ({ form, onSubmit, loading }) => {
    const { register, handleSubmit, formState: { errors } } = form;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
            <Title order={3} mb="md">2. Security Settings</Title>

            <Text fw={500} size="sm" mb="sm">Change Password</Text>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <PasswordInput
                            label="Current Password"
                            placeholder="Current password"
                            error={errors.currentPassword?.message}
                            {...register('currentPassword')}
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <PasswordInput
                            label="New Password"
                            placeholder="New password"
                            error={errors.newPassword?.message}
                            {...register('newPassword')}
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                        <PasswordInput
                            label="Confirm New Password"
                            placeholder="Retype new password"
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword')}
                        />
                    </Grid.Col>
                </Grid>

                <Group justify="flex-end" mt="md">
                    <Button type="submit" loading={loading}>
                        {loading ? 'Changing...' : 'Change Password'}
                    </Button>
                </Group>
            </form>

            <Divider my="lg" />

            <Group justify="space-between" align="center">
                <Box>
                    <Text fw={500} size="sm">Two-Factor Authentication (2FA)</Text>
                    <Text size="xs" c="dimmed">Secure your account with an additional layer.</Text>
                </Box>
                <ThemeToggle />
            </Group>
        </Card>
    );
};

export default SecuritySection;