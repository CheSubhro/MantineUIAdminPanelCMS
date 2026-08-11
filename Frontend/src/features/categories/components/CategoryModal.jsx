
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
import { categoryFormSchema } from '../../../utils/validators';

function CategoryModalContent({
    isOpen,
    onClose,
    onSave,
    categoryToEdit = null
}) {
    const {
        control,
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            image: '',
            status: 'Active',
        },
    });

    useEffect(() => {
        if (categoryToEdit) {
            reset({
                id: categoryToEdit.id,
                name: categoryToEdit.name || '',
                slug: categoryToEdit.slug || '',
                description: categoryToEdit.description || '',
                image: categoryToEdit.image || '',
                status: categoryToEdit.status || 'Active',
            });
        } else {
            reset({
                name: '',
                slug: '',
                description: '',
                image: '',
                status: 'Active',
            });
        }
    }, [categoryToEdit, isOpen, reset]);

    const handleNameChange = (e) => {
        const value = e.target.value;
        setValue('name', value, { shouldValidate: true });

        // Auto-generate slug from name if creating a new category
        if (!categoryToEdit) {
            const generatedSlug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setValue('slug', generatedSlug, { shouldValidate: true });
        }
    };

    const handleFormSubmit = (data) => {
        onSave(data);
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
            title={categoryToEdit ? 'Edit Category' : 'Add New Category'}
            size="md"
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack gap="md">
                    <Input
                        label="Category Name"
                        placeholder="e.g. Technology"
                        error={errors.name?.message}
                        required
                        {...register('name', {
                            onChange: handleNameChange,
                        })}
                    />

                    <Input
                        label="Slug"
                        placeholder="e.g. technology"
                        error={errors.slug?.message}
                        required
                        {...register('slug')}
                    />

                    <Input
                        label="Image URL"
                        placeholder="https://example.com/image.jpg"
                        error={errors.image?.message}
                        {...register('image')}
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
                                error={errors.status?.message}
                            />
                        )}
                    />

                    <Input
                        label="Description"
                        placeholder="Write a short description..."
                        error={errors.description?.message}
                        {...register('description')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button type="submit">
                            {categoryToEdit ? 'Update Category' : 'Create Category'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}

export default function CategoryModal(props) {
    return (
        <ErrorBoundary>
            <CategoryModalContent {...props} />
        </ErrorBoundary>
    );
}