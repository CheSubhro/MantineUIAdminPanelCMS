
import React from 'react';
import { Title, Grid, Group } from '@mantine/core';
import { Card, Input, Button } from '../../../components/common';

const ProfileInfoSection = ({ form, onSubmit, loading }) => {
    const { register, handleSubmit, formState: { errors } } = form;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
            <Title order={3} mb="md">1. Profile Information</Title>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            error={errors.fullName?.message}
                            {...register('fullName')}
                        />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 6 }}>
                        <Input
                            label="Username"
                            placeholder="johndoe"
                            disabled
                            error={errors.username?.message}
                            {...register('username')}
                        />
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Input
                            label="Email Address"
                            placeholder="john.doe@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />
                    </Grid.Col>
                </Grid>

                <Group justify="flex-end" mt="md">
                    <Button type="submit" loading={loading}>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </Button>
                </Group>
            </form>
        </Card>
    );
};

export default ProfileInfoSection;