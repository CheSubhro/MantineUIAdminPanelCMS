
import { useState, useMemo } from 'react';
import { notifications } from '@mantine/notifications';

const INITIAL_MEDIA_FILES = [
    { id: 1, name: 'banner-image-1.jpg', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400', size: '1.2 MB' },
    { id: 2, name: 'dashboard-preview.png', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400', size: '850 KB' },
    { id: 3, name: 'author-profile.jpg', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400', size: '450 KB' },
];

export function useMediaManager() {
    
    const [mediaFiles, setMediaFiles] = useState(INITIAL_MEDIA_FILES);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    // Modal state (similar to isModalOpen)
    const [opened, setOpened] = useState(false);

    // Delete confirmation state
    const [mediaToDelete, setMediaToDelete] = useState(null);

    // Filtered media files based on search query using useMemo
    const filteredMediaFiles = useMemo(() => {
        return mediaFiles.filter((file) => 
            file.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [mediaFiles, searchQuery]);

    const handleCopyUrl = (url) => {
        navigator.clipboard.writeText(url);
        notifications.show({
            title: 'Success',
            message: 'Image URL copied to clipboard!',
            color: 'green',
        });
    };

    const handleDeleteFunction = (id) => {
        setMediaFiles((prev) => prev.filter((file) => file.id !== id));
        setMediaToDelete(null);
        notifications.show({
            title: 'Deleted',
            message: 'Media file deleted successfully!',
            color: 'red',
        });
    };

    const handleUpload = (files) => {
        console.log('Accepted files', files);
        setLoading(true);
        // Simulate upload logic if needed
        setTimeout(() => {
            setLoading(false);
            setOpened(false);
            notifications.show({ 
                title: 'Uploaded', 
                message: 'Files uploaded successfully!', 
                color: 'green' 
            });
        }, 500);
    };

    return {
        mediaFiles: filteredMediaFiles,
        totalCount: mediaFiles.length,
        searchQuery,
        setSearchQuery,
        loading,
        opened,
        setOpened,
        mediaToDelete,
        setMediaToDelete,
        handleCopyUrl,
        handleDeleteFunction,
        handleUpload,
    };
}