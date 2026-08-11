
import React from 'react';
import { Container, Title, Stack, SimpleGrid } from '@mantine/core';
import { useSEO } from '../hooks/useSEO';
import SeoForm from '../features/seo/components/SeoForm';
import SeoPreview from '../features/seo/components/SeoPreview';
import GlobalSeoSettings from '../features/seo/components/GlobalSeoSettings';

export default function SeoPage() {
    
    const { seoData, updateSeoField, seoScore } = useSEO();

    const handleSave = () => {
        console.log('Saving SEO Data:', seoData);
        // Backend API call integration point
    };

    const handleGenerateSitemap = () => {
        alert('Sitemap.xml generated successfully!');
    };

    return (
        <Container size="xl" py="md">
            <Stack gap="lg">
                <Title order={2}>SEO & Metadata Management</Title>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                    <SeoForm
                        seoData={seoData}
                        onChange={updateSeoField}
                        onSave={handleSave}
                    />
                    <Stack gap="lg">
                        <SeoPreview
                            seoData={seoData}
                            seoScore={seoScore}
                        />
                        <GlobalSeoSettings
                            seoData={seoData}
                            onChange={updateSeoField}
                            onGenerateSitemap={handleGenerateSitemap}
                        />
                    </Stack>
                </SimpleGrid>
            </Stack>
        </Container>
    );
}