
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordInput, FileInput, Stack } from '@mantine/core';
import { IconUser, IconAt, IconLock, IconPhoto, IconShieldCheck } from '@tabler/icons-react';
import { Button, Input, CustomSelect } from '../../../components/common';
import { registerFormSchema } from '../../../utils/validators';

export default function RegisterForm({ onSubmit }) {

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            fullName: '',
            username: '',
            email: '',
            password: '',
            role: 'Admin',
            avatar: null,
            coverImage: null,
        },
    });

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Stack>
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    leftSection={<IconUser size={16} />}
                    error={errors.fullName?.message}
                    {...register('fullName')}
                />

                <Input
                    label="Username"
                    placeholder="johndoe"
                    leftSection={<IconUser size={16} />}
                    error={errors.username?.message}
                    {...register('username')}
                />

                <Input
                    label="Email"
                    placeholder="you@mantine.dev"
                    leftSection={<IconAt size={16} />}
                    error={errors.email?.message}
                    {...register('email')}
                />

                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    leftSection={<IconLock size={16} />}
                    error={errors.password?.message}
                    {...register('password')}
                />

                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <CustomSelect
                            label="Role"
                            placeholder="Select role"
                            leftSection={<IconShieldCheck size={16} />}
                            data={['Super Admin', 'Admin', 'Moderator', 'Editor']}
                            value={field.value}
                            onChange={field.onChange}
                            error={errors.role?.message}
                        />
                    )}
                />

                <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                        <FileInput
                            label="Avatar"
                            placeholder="Upload avatar image"
                            leftSection={<IconPhoto size={16} />}
                            accept="image/png,image/jpeg"
                            value={field.value}
                            onChange={(file) => field.onChange(file ? URL.createObjectURL(file) : null)}
                            error={errors.avatar?.message}
                        />
                    )}
                />

                <Controller
                    name="coverImage"
                    control={control}
                    render={({ field }) => (
                        <FileInput
                            label="Cover Image"
                            placeholder="Upload cover image"
                            leftSection={<IconPhoto size={16} />}
                            accept="image/png,image/jpeg"
                            value={field.value}
                            onChange={(file) => field.onChange(file ? URL.createObjectURL(file) : null)}
                            error={errors.coverImage?.message}
                        />
                    )}
                />

                <Button type="submit" fullWidth mt="xl">
                    Register
                </Button>
            </Stack>
        </form>
    );
}