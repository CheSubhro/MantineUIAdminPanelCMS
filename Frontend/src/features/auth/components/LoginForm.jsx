
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput, Stack, Text } from '@mantine/core';
import { IconAt, IconLock } from '@tabler/icons-react';
import { Button, Input } from '../../../components/common';
import { loginFormSchema } from '../../../utils/validators';

export default function LoginForm({ onSubmit, error }) {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const handleLoginSubmit = (data) => {
        onSubmit(data.identifier, data.password);
    };

    return (
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <Stack>
                <Input
                    label="Username or Email"
                    placeholder="Enter username or email"
                    leftSection={<IconAt size={16} />}
                    error={errors.identifier?.message}
                    {...register('identifier')}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    leftSection={<IconLock size={16} />}
                    error={errors.password?.message}
                    {...register('password')}
                />

                {error && (
                    <Text c="red" size="xs">
                        {error}
                    </Text>
                )}

                <Button type="submit" fullWidth mt="xl">
                    Sign in
                </Button>
            </Stack>
        </form>
    );
}