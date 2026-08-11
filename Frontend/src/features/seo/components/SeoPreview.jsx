
import React from 'react';
import { Stack, Text, Box, Group } from '@mantine/core';
import { Card, Badge } from '../../../components/common/index';

export default function SeoPreview({ seoData, seoScore }) {

    const getBadgeColor = (score) => {
        if (score >= 80) return 'green';
        if (score >= 50) return 'yellow';
        return 'red';
    };

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Stack gap="md">
                <Group justify="space-between">
                    <Text fw={600} size="lg">Real-Time Google Snippet Preview</Text>
                    <Badge color={getBadgeColor(seoScore)}>SEO Score: {seoScore}/100</Badge>
                </Group>

                <Box p="md" style={(theme) => ({ border: '1px solid var(--mantine-color-default-border)', borderRadius: theme.radius.sm, backgroundColor: 'var(--mantine-color-body)' })}>
                    <Text size="xs" c="dimmed">https://yourwebsite.com › post-slug</Text>
                    <Text size="md" fw={600} c="blue" style={{ lineHeight: 1.2, marginTop: '2px' }}>
                        {seoData.metaTitle || 'Please enter a meta title...'}
                    </Text>
                    <Text size="sm" c="dimmed" style={{ marginTop: '4px' }}>
                        {seoData.metaDescription || 'Please enter a meta description to see how it appears in search engine result pages...'}
                    </Text>
                </Box>
            </Stack>
        </Card>
    );
}