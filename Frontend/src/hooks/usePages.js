
import { useState, useEffect, useMemo, useCallback } from 'react';
import { showToast } from '../utils/toast';
import api from '../services/api';

export function usePages() {
    const [pages, setPages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(false);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageToEdit, setPageToEdit] = useState(null);

    // Delete confirmation state
    const [pageToDelete, setPageToDelete] = useState(null);

    // Fetch all pages from backend API
    const fetchPages = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/pages');
            const pagesData = response.data.data || response.data;
            setPages(Array.isArray(pagesData) ? pagesData : []);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch pages.';
            showToast.error('Fetch Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPages();
    }, [fetchPages]);

    // Filtered pages based on search query and status filter
    const filteredPages = useMemo(() => {
        return pages.filter((page) => {
            const title = page.title || '';
            const slug = page.slug || '';
            const author = page.author || '';
            const query = searchQuery.toLowerCase();

            const matchesSearch = 
                title.toLowerCase().includes(query) ||
                slug.toLowerCase().includes(query) ||
                author.toLowerCase().includes(query);

            const matchesStatus = 
                statusFilter === 'All' || page.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [pages, searchQuery, statusFilter]);

    // Open Modal for Add or Edit
    const handleOpenModal = (page = null) => {
        setPageToEdit(page);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setPageToEdit(null);
        setIsModalOpen(false);
    };

    // Save Page (Create / Update via Backend API using JSON)
    const handleSavePage = async (pageData) => {
        setLoading(true);
        try {
            const pageId = pageData._id || pageData.id || pageToEdit?._id || pageToEdit?.id;

            const payload = {
                title: pageData.title,
                slug: pageData.slug,
                author: pageData.author,
                status: pageData.status,
                excerpt: pageData.excerpt,
                content: pageData.content,
            };

            if (pageId) {
                // Edit existing page using PATCH / PUT
                const response = await api.put(`/pages/${pageId}`, payload);
                const updatedPage = response.data.data || response.data;

                setPages((prev) =>
                    prev.map((page) => 
                        page._id === pageId || page.id === pageId ? updatedPage : page
                    )
                );
                showToast.success('Page Updated', 'Website page details updated successfully.');
            } else {
                // Add new page using POST
                const response = await api.post('/pages', payload);
                const newPage = response.data.data || response.data;

                setPages((prev) => [newPage, ...prev]);
                showToast.success('Page Created', 'New website page added successfully.');
            }

            handleCloseModal();
            fetchPages();
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to save page details.';
            showToast.error('Operation Failed', errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Delete Page
    const handleDeletePage = async (id) => {
        setLoading(true);
        try {
            await api.delete(`/pages/${id}`);
            setPages((prev) => prev.filter((page) => page._id !== id && page.id !== id));
            setPageToDelete(null);
            showToast.success('Page Deleted', 'Website page has been removed successfully.');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete page.';
            showToast.error('Action Failed', errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Bulk Delete Pages
    const handleBulkDeletePages = async (ids) => {
        if (!ids || ids.length === 0) return;
        setLoading(true);
        try {
            await api.delete('/pages/bulk', { data: { ids } });
            setPages((prev) => prev.filter((page) => !ids.includes(page._id) && !ids.includes(page.id)));
            showToast.success('Pages Deleted', `${ids.length} website pages have been removed successfully.`);
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to bulk delete pages.';
            showToast.error('Action Failed', errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        pages: filteredPages,
        allPagesCount: pages.length,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        loading,
        isModalOpen,
        pageToEdit,
        pageToDelete,
        setPageToDelete,
        handleOpenModal,
        handleCloseModal,
        handleSavePage,
        handleDeletePage,
        handleBulkDeletePages,
        refetchPages: fetchPages,
    };
}