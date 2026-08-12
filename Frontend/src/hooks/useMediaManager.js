
import { useState, useEffect, useMemo, useCallback } from 'react';
import { showToast } from '../utils/toast';
import api from '../services/api';

export function useMediaManager() {
    
    const [mediaFiles, setMediaFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    // Modal state (opened/closed)
    const [opened, setOpened] = useState(false);

    // Delete confirmation state
    const [mediaToDelete, setMediaToDelete] = useState(null);

    // Fetch all media files from backend API
    const fetchMediaFiles = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/media');
            const mediaData = response.data.data || response.data;
            setMediaFiles(Array.isArray(mediaData) ? mediaData : []);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch media files.';
            showToast.error('Fetch Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMediaFiles();
    }, [fetchMediaFiles]);

    // Filtered media files based on search query using useMemo
    const filteredMediaFiles = useMemo(() => {
        return mediaFiles.filter((file) => {
            const fileName = file.name || file.filename || '';
            return fileName.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [mediaFiles, searchQuery]);

    const handleCopyUrl = (url) => {
        if (!url) return;
        navigator.clipboard.writeText(url);
        showToast.success('URL Copied', 'Image URL copied to clipboard!');
    };

    // Helper to get correct ID (_id or id)
    const getId = (file) => file._id || file.id;

    // Delete Media File via Backend API
    const handleDeleteFunction = async (id) => {
        try {
            await api.delete(`/media/${id}`);
            setMediaFiles((prev) => prev.filter((file) => getId(file) !== id));
            setMediaToDelete(null);
            showToast.success('Deleted', 'Media file deleted successfully!');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete media file.';
            showToast.error('Action Failed', errorMessage);
            return false;
        }
    };

    // Upload Media Files via Backend API using Multipart Form Data
    const handleUpload = async (files) => {
        if (!files) return;
        setLoading(true);
        try {
            const formData = new FormData();

            // Handle single file or multiple files array/FileList
            const fileList = Array.isArray(files) ? files : [files];
            fileList.forEach((file) => {
                formData.append('file', file);
            });

            // এখানে আলাদা করে headers দেওয়ার প্রয়োজন নেই, Axios এবং ইন্টারসেপ্টর নিজে থেকেই টোকেন ও বাউন্ডারি হ্যান্ডেল করবে
            await api.post('/media/upload', formData);

            showToast.success('Uploaded', 'Files uploaded successfully!');
            setOpened(false);
            fetchMediaFiles();
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to upload media files.';
            showToast.error('Upload Failed', errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
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
        refetchMedia: fetchMediaFiles,
    };
}