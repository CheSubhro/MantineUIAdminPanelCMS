
import { useState, useMemo } from 'react';
import { showToast } from '../utils/toast'; 

const INITIAL_CATEGORIES = [
    {
        id: '1',
        name: 'Technology',
        slug: 'technology',
        description: 'Latest tech news, gadgets, and software development trends.',
        postCount: 12,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100',
        status: 'Active'
    },
    {
        id: '2',
        name: 'Lifestyle',
        slug: 'lifestyle',
        description: 'Tips for daily living, health, productivity, and wellness.',
        postCount: 8,
        image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=100',
        status: 'Active'
    },
    {
        id: '3',
        name: 'Travel',
        slug: 'travel',
        description: 'Explore breathtaking destinations and travel guides.',
        postCount: 5,
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100',
        status: 'Inactive'
    }
];

export function useCategories() {
    
    const [categories, setCategories] = useState(INITIAL_CATEGORIES);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(false);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);

    // Delete confirmation state
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Filtered categories based on search query and status
    const filteredCategories = useMemo(() => {
        return categories.filter((category) => {
            const matchesSearch = 
                category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                category.slug.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesStatus = statusFilter === 'All' || category.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [categories, searchQuery, statusFilter]);

    // Open Modal for Add or Edit
    const handleOpenModal = (category = null) => {
        setCategoryToEdit(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setCategoryToEdit(null);
        setIsModalOpen(false);
    };

    // Save Category (Create / Update)
    const handleSaveCategory = (categoryData) => {
        if (categoryData.id || categoryToEdit?.id) {
            // Edit existing category
            const targetId = categoryData.id || categoryToEdit.id;
            setCategories((prev) =>
                prev.map((cat) => (cat.id === targetId ? { ...cat, ...categoryData, id: targetId } : cat))
            );
            showToast.success('Category Updated', 'Category details updated successfully.');
        } else {
            // Add new category
            const newCategory = {
                ...categoryData,
                id: Date.now().toString(),
                postCount: 0,
            };
            setCategories((prev) => [newCategory, ...prev]);
            showToast.success('Category Created', 'New category added successfully.');
        }
        handleCloseModal();
    };

    // Delete Category
    const handleDeleteCategory = (id) => {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        setCategoryToDelete(null);
        showToast.success('Category Deleted', 'Category has been removed successfully.');
    };

    return {
        categories: filteredCategories,
        totalCount: categories.length,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        loading,
        isModalOpen,
        categoryToEdit,
        categoryToDelete,
        setCategoryToDelete,
        handleOpenModal,
        handleCloseModal,
        handleSaveCategory,
        handleDeleteCategory,
    };
}