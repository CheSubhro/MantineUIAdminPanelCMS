
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Group, Text, Avatar, FileButton, Box } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Modal,
    Input,
    CustomSelect,
    Button,
    ErrorBoundary
} from '../../../components/common';
import { postFormSchema } from '../../../utils/validators';

function PostModalContent({
    isOpen,
    onClose,
    onSave,
    postToEdit = null,
    categories = []
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
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            category: 'Technology',
            author: 'Subhro Mondal',
            image: null,
            existingImage: '',
            status: 'Published',
        },
    });

    const watchedTitle = watch('title');
    const watchedImage = watch('image');
    const watchedExistingImage = watch('existingImage');

    // Tiptap Editor Hook Setup with RHF integration
    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            setValue('content', html, { shouldValidate: true });
        },
        editorProps: {
            attributes: {
                style: 'min-height: 120px; outline: none; padding: 8px; white-space: pre-wrap;',
            },
        },
    });

    const categoryOptions = categories.length > 0
        ? categories.map(cat => ({ value: cat.name, label: cat.name }))
        : [
            { value: 'Technology', label: 'Technology' },
            { value: 'Lifestyle', label: 'Lifestyle' },
            { value: 'Travel', label: 'Travel' },
        ];

    const statusOptions = [
        { value: 'Published', label: 'Published' },
        { value: 'Draft', label: 'Draft' },
    ];

    useEffect(() => {
        if (postToEdit) {
            reset({
                id: postToEdit.id,
                title: postToEdit.title || '',
                slug: postToEdit.slug || '',
                excerpt: postToEdit.excerpt || '',
                content: postToEdit.content || '',
                category: postToEdit.category || 'Technology',
                author: postToEdit.author || 'Subhro Mondal',
                image: null,
                existingImage: postToEdit.image || '',
                status: postToEdit.status || 'Published',
            });
            if (editor && postToEdit.content) {
                editor.commands.setContent(postToEdit.content);
            }
        } else {
            reset({
                title: '',
                slug: '',
                excerpt: '',
                content: '',
                category: 'Technology',
                author: 'Subhro Mondal',
                image: null,
                existingImage: '',
                status: 'Published',
            });
            if (editor) {
                editor.commands.setContent('');
            }
        }
    }, [postToEdit, isOpen, editor, reset]);

    // Auto-generate slug from title if creating a new post
    useEffect(() => {
        if (!postToEdit && watchedTitle) {
            const generatedSlug = watchedTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setValue('slug', generatedSlug, { shouldValidate: true });
        }
    }, [watchedTitle, postToEdit, setValue]);

    const handleFileChange = (file) => {
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setValue('image', file);
            setValue('existingImage', fileUrl);
        }
    };

    const handleFormSubmit = (data) => {
        const payload = {
            ...data,
            image: data.image ? URL.createObjectURL(data.image) : data.existingImage
        };
        onSave(payload);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={postToEdit ? 'Edit Blog Post' : 'Add New Blog Post'}
            size="lg"
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack gap="md">
                    <Input
                        label="Post Title"
                        placeholder="e.g. Mastering React and Vite"
                        error={errors.title?.message}
                        required
                        {...register('title')}
                    />

                    <Input
                        label="Slug"
                        placeholder="e.g. mastering-react-and-vite"
                        error={errors.slug?.message}
                        required
                        {...register('slug')}
                    />

                    <Group grow preventGrowOverflow={false}>
                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (
                                <CustomSelect
                                    label="Category"
                                    placeholder="Select category"
                                    data={categoryOptions}
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
                    </Group>

                    <Input
                        label="Author"
                        placeholder="e.g. Subhro Mondal"
                        error={errors.author?.message}
                        required
                        {...register('author')}
                    />

                    {/* Featured Image Upload Field */}
                    <div>
                        <Text size="sm" fw={500} mb={5}>Featured Image</Text>
                        <Group align="center" gap="sm">
                            <FileButton onChange={handleFileChange} accept="image/png,image/jpeg,image/webp">
                                {(props) => (
                                    <Button {...props} variant="light" color="violet" leftSection={<IconUpload size={16} />}>
                                        Upload Image
                                    </Button>
                                )}
                            </FileButton>
                            {watchedExistingImage && (
                                <Group gap="xs">
                                    <Avatar src={watchedExistingImage} size={40} radius="sm" />
                                    <Text size="xs" c="dimmed">
                                        {watchedImage ? watchedImage.name : 'Current Image'}
                                    </Text>
                                </Group>
                            )}
                        </Group>
                    </div>

                    <Input
                        label="Excerpt / Short Summary"
                        placeholder="Write a short summary of the post..."
                        error={errors.excerpt?.message}
                        {...register('excerpt')}
                    />

                    {/* Tiptap Rich Text Editor Box */}
                    <div>
                        <Text size="sm" fw={500} mb={5}>Post Content</Text>
                        <Box
                            style={{
                                border: '1px solid var(--mantine-color-default-border)',
                                borderRadius: 'var(--mantine-radius-default)',
                                backgroundColor: 'var(--mantine-color-body)',
                                overflow: 'hidden',
                            }}
                        >
                            <EditorContent editor={editor} />
                        </Box>
                        {errors.content?.message && (
                            <Text size="xs" c="red" mt={4}>
                                {errors.content.message}
                            </Text>
                        )}
                    </div>

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" onClick={onClose} type="button" color="gray">
                            Cancel
                        </Button>
                        <Button type="submit" color="violet">
                            {postToEdit ? 'Update Post' : 'Create Post'}
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}

export default function PostModal(props) {
    return (
        <ErrorBoundary>
            <PostModalContent {...props} />
        </ErrorBoundary>
    );
}