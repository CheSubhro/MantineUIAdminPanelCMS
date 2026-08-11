
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Group, FileInput, PasswordInput } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import {
    Modal,
    Input,
    CustomSelect,
    Button,
    ErrorBoundary
} from '../../../components/common';
import { userFormSchema } from '../../../utils/validators';

function UserModalContent({
    isOpen,
    onClose,
    onSave,
    userToEdit = null
}) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userFormSchema),
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            role: 'User',
            status: 'Active',
            avatar: null,
            coverImage: null,
        },
    });

    const roleOptions = [
        { value: 'Admin', label: 'Admin' },
        { value: 'Manager', label: 'Manager' },
        { value: 'Moderator', label: 'Moderator' },
        { value: 'Editor', label: 'Editor' },
        { value: 'User', label: 'User' },
        { value: 'Author', label: 'Author' },
        { value: 'Contributor', label: 'Contributor' },
        { value: 'Developer', label: 'Developer' },
        { value: 'Customer_Support', label: 'Customer Support' },
        { value: 'Seller', label: 'Seller' },
        { value: 'Rider', label: 'Rider' },
        { value: 'Accountant', label: 'Accountant' },
    ];

    useEffect(() => {
        if (userToEdit) {
            let matchedRole = 'User';
            if (userToEdit.role) {
                const found = roleOptions.find(
                    (opt) => opt.value.toLowerCase() === userToEdit.role.toLowerCase()
                );
                matchedRole = found ? found.value : userToEdit.role;
            }

            reset({
                id: userToEdit._id || userToEdit.id,
                name: userToEdit.name || userToEdit.fullName || '',
                username: userToEdit.username || '',
                email: userToEdit.email || '',
                password: '',
                role: matchedRole,
                status: userToEdit.status || 'Active',
                avatar: null,
                coverImage: null,
            });
        } else {
            reset({
                name: '',
                username: '',
                email: '',
                password: '',
                role: 'User',
                status: 'Active',
                avatar: null,
                coverImage: null,
            });
        }
    }, [userToEdit, isOpen, reset]);

    const handleFormSubmit = (data) => {
        const id = userToEdit?._id || userToEdit?.id;

        onSave({
            ...data,
            id,
        });

        onClose();
    };

    const statusOptions = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={userToEdit ? 'Edit User' : 'Add New User'}
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack gap="md">
                    <Input
                        label="Full Name"
                        placeholder="Enter user name"
                        error={errors.name?.message}
                        required
                        {...register('name')}
                    />

                    <Input
                        label="Username"
                        placeholder="Enter unique username"
                        error={errors.username?.message}
                        required
                        {...register('username')}
                    />

                    <Input
                        label="Email Address"
                        placeholder="Enter email address"
                        error={errors.email?.message}
                        required
                        {...register('email')}
                    />

                    {!userToEdit && (
                        <PasswordInput
                            label="Password"
                            placeholder="Enter secure password"
                            leftSection={<IconLock size={16} />}
                            error={errors.password?.message}
                            required
                            {...register('password')}
                        />
                    )}

                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                label="Role"
                                placeholder="Select role"
                                data={roleOptions}
                                value={field.value || 'User'}
                                onChange={(val) => field.onChange(val)}
                            />
                        )}
                    />

                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                label="Status"
                                placeholder="Select status"
                                data={statusOptions}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />

                    <Controller
                        name="avatar"
                        control={control}
                        render={({ field }) => (
                            <FileInput
                                label="Avatar Image"
                                placeholder="Upload avatar"
                                accept="image/png,image/jpeg,image/jpg"
                                value={field.value}
                                onChange={field.onChange}
                                clearable
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
                                accept="image/png,image/jpeg,image/jpg"
                                value={field.value}
                                onChange={field.onChange}
                                clearable
                            />
                        )}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button type="submit">
                            {userToEdit ? 'Update User' : 'Save User'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}

export default function UserModal(props) {
    return (
        <ErrorBoundary>
            <UserModalContent {...props} />
        </ErrorBoundary>
    );
}