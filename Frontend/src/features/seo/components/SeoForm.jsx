
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Text, Group } from '@mantine/core';
import { Card, Input, Button, CustomSelect, Tooltip, Badge } from '../../../components/common/index';
import { IconHelp, IconWorld, IconSparkles } from '@tabler/icons-react';
import { seoFormSchema } from '../../../utils/validators';

export default function SeoForm({ seoData = {}, onSave, loading }) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(seoFormSchema),
        defaultValues: {
            metaTitle: seoData.metaTitle || '',
            metaDescription: seoData.metaDescription || '',
            focusKeyword: seoData.focusKeyword || '',
            targetPlatform: seoData.targetPlatform || 'facebook',
            ogTitle: seoData.ogTitle || '',
            ogDescription: seoData.ogDescription || '',
            ogImage: seoData.ogImage || '',
        },
    });

    const socialPlatforms = [
        { value: 'facebook', label: 'Facebook / Open Graph' },
        { value: 'twitter', label: 'Twitter Card' },
        { value: 'linkedin', label: 'LinkedIn Post' }
    ];

    const handleFormSubmit = (data) => {
        if (onSave) {
            onSave(data);
        }
    };

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack gap="md">
                    <Group justify="space-between" align="center">
                        <Group gap="xs">
                            <IconWorld size={22} color="var(--mantine-color-blue-6)" />
                            <Text fw={600} size="lg">Meta Fields & Open Graph Configuration</Text>
                        </Group>
                        <Badge color="blue" variant="light">SEO Engine Active</Badge>
                    </Group>

                    {/* Meta Title */}
                    <Group align="flex-end" grow>
                        <Input
                            label="Meta Title"
                            placeholder="Enter meta title (30-60 chars)"
                            error={errors.metaTitle?.message}
                            {...register('metaTitle')}
                        />
                        <Tooltip label="Optimal title length is between 30 to 60 characters for best search visibility." position="top">
                            <IconHelp size={18} style={{ cursor: 'pointer', marginBottom: '10px' }} />
                        </Tooltip>
                    </Group>

                    {/* Meta Description */}
                    <Group align="flex-end" grow>
                        <Input
                            label="Meta Description"
                            placeholder="Enter meta description (70-160 chars)"
                            error={errors.metaDescription?.message}
                            {...register('metaDescription')}
                        />
                        <Tooltip label="Keep description between 70 to 160 characters to avoid truncation in SERP." position="top">
                            <IconHelp size={18} style={{ cursor: 'pointer', marginBottom: '10px' }} />
                        </Tooltip>
                    </Group>

                    {/* Focus Keyword */}
                    <Input
                        label="Focus Keyword"
                        placeholder="Primary keyword for optimization"
                        error={errors.focusKeyword?.message}
                        {...register('focusKeyword')}
                    />

                    <Text fw={500} size="md" mt="sm">Open Graph (OG) Social Settings</Text>

                    {/* Social Platform Select */}
                    <Controller
                        name="targetPlatform"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                label="Target Social Platform"
                                placeholder="Select platform"
                                data={socialPlatforms}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />

                    <Input
                        label="OG Title"
                        placeholder="Social share title"
                        error={errors.ogTitle?.message}
                        {...register('ogTitle')}
                    />

                    <Input
                        label="OG Description"
                        placeholder="Social share description"
                        error={errors.ogDescription?.message}
                        {...register('ogDescription')}
                    />

                    <Input
                        label="OG Image URL"
                        placeholder="https://example.com/image.jpg"
                        error={errors.ogImage?.message}
                        {...register('ogImage')}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button
                            leftSection={<IconSparkles size={16} />}
                            type="submit"
                            loading={loading}
                        >
                            Save SEO Settings
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Card>
    );
}