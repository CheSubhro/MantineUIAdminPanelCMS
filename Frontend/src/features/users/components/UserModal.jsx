
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Group } from '@mantine/core';
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
            email: '',
            role: 'User',
            status: 'Active',
        },
    });

    useEffect(() => {
        if (userToEdit) {
            reset({
                id: userToEdit.id,
                name: userToEdit.name || '',
                email: userToEdit.email || '',
                role: userToEdit.role || 'User',
                status: userToEdit.status || 'Active',
            });
        } else {
            reset({
                name: '',
                email: '',
                role: 'User',
                status: 'Active',
            });
        }
    }, [userToEdit, isOpen, reset]);

    const handleFormSubmit = (data) => {
        const payload = {
            ...data,
            ...(userToEdit?.id && { id: userToEdit.id }),
        };
        onSave(payload);
        onClose();
    };

    const roleOptions = [
        { value: 'Admin', label: 'Admin' },
        { value: 'Manager', label: 'Manager' },
        { value: 'User', label: 'User' },
    ];

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
                        label="Email Address"
                        placeholder="Enter email address"
                        error={errors.email?.message}
                        required
                        {...register('email')}
                    />

                    <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                label="Role"
                                placeholder="Select role"
                                data={roleOptions}
                                value={field.value}
                                onChange={field.onChange}
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