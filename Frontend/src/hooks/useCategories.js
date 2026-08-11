
import { useState, useEffect, useMemo, useCallback } from 'react';
import { showToast } from '../utils/toast';
import api from '../services/api';

export function useCategories() {

    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [loading, setLoading] = useState(false);

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);

    // Delete confirmation state
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Fetch all categories from backend API
    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/categories');
            const categoriesData = response.data.data || response.data;
            setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch categories.';
            showToast.error('Fetch Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // Filtered categories based on search query and status
    const filteredCategories = useMemo(() => {
        return categories.filter((category) => {
            const name = category.name || '';
            const slug = category.slug || '';
            const query = searchQuery.toLowerCase();

            const matchesSearch = 
                name.toLowerCase().includes(query) ||
                slug.toLowerCase().includes(query);
            
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

    // Save Category (Create / Update via Backend API with Multipart Form Data)
    const handleSaveCategory = async (categoryData) => {
        
        setLoading(true);
        try {
            const categoryId = categoryData._id || categoryData.id || categoryToEdit?._id || categoryToEdit?.id;
            const formData = new FormData();

            if (categoryData.name) formData.append('name', categoryData.name);
            if (categoryData.slug) formData.append('slug', categoryData.slug);
            if (categoryData.description) formData.append('description', categoryData.description);
            if (categoryData.status) formData.append('status', categoryData.status);

            if (categoryData.image instanceof File) {
                formData.append('image', categoryData.image);
            }

            if (categoryId) {
                // Edit / Update existing category using PATCH
                const response = await api.patch(`/categories/${categoryId}`, formData);
                const updatedCategory = response.data.data || response.data;

                setCategories((prev) =>
                    prev.map((cat) => (cat._id === categoryId || cat.id === categoryId ? updatedCategory : cat))
                );
                showToast.success('Category Updated', 'Category details updated successfully.');
            } else {
                // Add new category using POST
                const response = await api.post('/categories', formData);
                const newCategory = response.data.data || response.data;

                setCategories((prev) => [newCategory, ...prev]);
                showToast.success('Category Created', 'New category added successfully.');
            }

            handleCloseModal();
            fetchCategories();
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to save category details.';
            showToast.error('Operation Failed', errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Delete Category
    const handleDeleteCategory = async (id) => {
        try {
            await api.delete(`/categories/${id}`);
            setCategories((prev) => prev.filter((cat) => cat._id !== id && cat.id !== id));
            setCategoryToDelete(null);
            showToast.success('Category Deleted', 'Category has been removed successfully.');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete category.';
            showToast.error('Action Failed', errorMessage);
            return false;
        }
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
        refetchCategories: fetchCategories,
    };
}