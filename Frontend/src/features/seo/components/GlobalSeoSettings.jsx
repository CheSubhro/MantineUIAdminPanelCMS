
import React from 'react';
import { Stack, Text, Group } from '@mantine/core';
import { Card, Input, Button, Tooltip, Badge } from '../../../components/common/index';
import { IconRobot, IconHelp } from '@tabler/icons-react';

export default function GlobalSeoSettings({ seoData, onChange, onGenerateSitemap }) {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Stack gap="md">
                <Group justify="space-between" align="center">
                    <Group gap="xs">
                        <IconRobot size={22} color="var(--mantine-color-blue-6)" />
                        <Text fw={600} size="lg">Global SEO Settings & Tools</Text>
                    </Group>
                    <Badge color="green" variant="light">System Level</Badge>
                </Group>

                <Group align="flex-end" grow>
                    <Input
                        label="Robots.txt Configuration"
                        placeholder="User-agent: *\nAllow: /"
                        value={seoData.robotsTxt}
                        onChange={(e) => onChange('robotsTxt', e.target.value)}
                    />
                    <Tooltip label="Define crawling rules for search engine bots and web scrapers." position="top">
                        <IconHelp size={18} style={{ cursor: 'pointer', marginBottom: '10px' }} />
                    </Tooltip>
                </Group>

                <Group justify="space-between" align="center" mt="md">
                    <Text size="sm" c="dimmed">Generate automated XML sitemap for search engine crawlers.</Text>
                    <Button variant="outline" onClick={onGenerateSitemap}>Generate Sitemap.xml</Button>
                </Group>
            </Stack>
        </Card>
    );
}