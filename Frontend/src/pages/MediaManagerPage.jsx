
import { Container, Title, Text, Group } from '@mantine/core';
import { useMediaManager } from '../hooks/useMediaManager';
import MediaToolbar from '../features/media/components/MediaToolbar';
import MediaGrid from '../features/media/components/MediaGrid';
import MediaUploadModal from '../features/media/components/MediaUploadModal';

export default function MediaManagerPage() {
    const {
        opened,
        setOpened,
        searchQuery,
        setSearchQuery,
        mediaFiles,
        handleCopyUrl,
        handleDeleteFunction,
        handleUpload,
    } = useMediaManager();

    return (
        <Container fluid py="md">
            <Group justify="space-between" mb="lg">
                <div>
                    <Title order={2} c="white">Media Library</Title>
                    <Text size="sm" c="dimmed">Manage and organize your uploaded assets stored in Cloudinary</Text>
                </div>
            </Group>

            <MediaToolbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onOpenUpload={() => setOpened(true)}
            />

            <MediaGrid
                mediaFiles={mediaFiles}
                onCopyUrl={handleCopyUrl}
                onDelete={handleDeleteFunction}
            />

            <MediaUploadModal
                opened={opened}
                onClose={() => setOpened(false)}
                onUpload={handleUpload}
            />
        </Container>
    );
}