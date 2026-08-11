
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
import { pageFormSchema } from '../../../utils/validators';

function PageModalContent({
    isOpen,
    onClose,
    onSave,
    pageToEdit = null
}) {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(pageFormSchema),
        defaultValues: {
            title: '',
            slug: '',
            excerpt: '',
            author: 'Subhro Mondal',
            status: 'Published',
        },
    });

    const watchedTitle = watch('title');

    const statusOptions = [
        { value: 'Published', label: 'Published' },
        { value: 'Draft', label: 'Draft' },
    ];

    useEffect(() => {
        if (pageToEdit) {
            reset({
                id: pageToEdit.id,
                title: pageToEdit.title || '',
                slug: pageToEdit.slug || '',
                excerpt: pageToEdit.excerpt || '',
                author: pageToEdit.author || 'Subhro Mondal',
                status: pageToEdit.status || 'Published',
            });
        } else {
            reset({
                title: '',
                slug: '',
                excerpt: '',
                author: 'Subhro Mondal',
                status: 'Published',
            });
        }
    }, [pageToEdit, isOpen, reset]);

    // Auto-generate slug from title if creating a new page
    useEffect(() => {
        if (!pageToEdit && watchedTitle) {
            const generatedSlug = watchedTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setValue('slug', generatedSlug, { shouldValidate: true });
        }
    }, [watchedTitle, pageToEdit, setValue]);

    const handleFormSubmit = (data) => {
        const currentDate = new Date().toISOString().split('T')[0];
        const payload = {
            ...data,
            ...(pageToEdit?.id && { id: pageToEdit.id }),
            updatedAt: currentDate,
        };
        onSave(payload);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={pageToEdit ? 'Edit Website Page' : 'Add New Website Page'}
            size="md"
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack gap="md">
                    <Input
                        label="Page Title"
                        placeholder="e.g. Privacy Policy"
                        error={errors.title?.message}
                        required
                        {...register('title')}
                    />

                    <Input
                        label="Slug"
                        placeholder="e.g. privacy-policy"
                        error={errors.slug?.message}
                        required
                        {...register('slug')}
                    />

                    <Group grow>
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

                        <Input
                            label="Author"
                            placeholder="e.g. Subhro Mondal"
                            error={errors.author?.message}
                            required
                            {...register('author')}
                        />
                    </Group>

                    <Input
                        label="Excerpt / Summary"
                        placeholder="Write a short summary of the page..."
                        error={errors.excerpt?.message}
                        {...register('excerpt')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={onClose} type="button" color="gray">
                            Cancel
                        </Button>
                        <Button type="submit" color="violet">
                            {pageToEdit ? 'Update Page' : 'Create Page'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}

export default function PageModal(props) {
    return (
        <ErrorBoundary>
            <PageModalContent {...props} />
        </ErrorBoundary>
    );
}