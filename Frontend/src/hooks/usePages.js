
import { useState, useMemo } from 'react';
import { showToast } from '../utils/toast';

const INITIAL_PAGES = [
    {
        id: '1',
        title: 'Privacy Policy',
        slug: 'privacy-policy',
        author: 'Subhro Mondal',
        status: 'Published',
        excerpt: 'Learn how we collect, use, and protect your personal information.',
        content: 'This is the privacy policy content detailing data handling practices.',
        updatedAt: '2026-06-15',
    },
    {
        id: '2',
        title: 'Terms of Service',
        slug: 'terms-of-service',
        author: 'Subhro Mondal',
        status: 'Published',
        excerpt: 'Read the terms and conditions for using our website and services.',
        content: 'These are the terms and conditions governing website usage.',
        updatedAt: '2026-06-16',
    },
    {
        id: '3',
        title: 'About Us',
        slug: 'about-us',
        author: 'Subhro Mondal',
        status: 'Published',
        excerpt: 'Discover our mission, vision, and the team behind this platform.',
        content: 'We are a passionate team dedicated to delivering great content.',
        updatedAt: '2026-06-18',
    },
    {
        id: '4',
        title: 'Contact Us',
        slug: 'contact-us',
        author: 'Subhro Mondal',
        status: 'Draft',
        excerpt: 'Get in touch with us for inquiries, support, or feedback.',
        content: 'You can reach us via email or our official contact form.',
        updatedAt: '2026-06-20',
    },
];

export function usePages(initialPages = INITIAL_PAGES) {
    const [pages, setPages] = useState(initialPages);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(false);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageToEdit, setPageToEdit] = useState(null);

    // Delete confirmation state
    const [pageToDelete, setPageToDelete] = useState(null);

    // Filtered pages based on search query and status filter
    const filteredPages = useMemo(() => {
        return pages.filter((page) => {
            const matchesSearch = 
                page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                page.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                page.author.toLowerCase().includes(searchQuery.toLowerCase());

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

    // Save Page (Create / Update)
    const handleSavePage = (pageData) => {
        setLoading(true);
        setTimeout(() => {
            if (pageData.id || pageToEdit?.id) {
                // Edit existing page
                const targetId = pageData.id || pageToEdit.id;
                setPages((prev) =>
                    prev.map((page) => 
                        page.id === targetId 
                            ? { ...page, ...pageData, id: targetId, updatedAt: new Date().toISOString().split('T')[0] } 
                            : page
                    )
                );
                showToast.success('Page Updated', 'Website page details updated successfully.');
            } else {
                // Add new page
                const newPage = {
                    ...pageData,
                    id: Date.now().toString(),
                    updatedAt: new Date().toISOString().split('T')[0],
                };
                setPages((prev) => [newPage, ...prev]);
                showToast.success('Page Created', 'New website page added successfully.');
            }
            setLoading(false);
            handleCloseModal();
        }, 300);
    };

    // Delete Page
    const handleDeletePage = (id) => {
        setLoading(true);
        setTimeout(() => {
            setPages((prev) => prev.filter((page) => page.id !== id));
            setPageToDelete(null);
            setLoading(false);
            showToast.success('Page Deleted', 'Website page has been removed successfully.');
        }, 300);
    };

    // Bulk Delete Pages
    const handleBulkDeletePages = (ids) => {
        setLoading(true);
        setTimeout(() => {
            setPages((prev) => prev.filter((page) => !ids.includes(page.id)));
            setLoading(false);
            showToast.success('Pages Deleted', `${ids.length} website pages have been removed successfully.`);
        }, 300);
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
    };
}