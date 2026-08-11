
import { useState } from 'react';
import { Stack, Title, Text, Group } from '@mantine/core';
import { useCategories } from '../hooks/useCategories';
import CategoryTable from '../features/categories/components/CategoryTable';
import CategoryModal from '../features/categories/components/CategoryModal';
import { ErrorBoundary } from '../components/common';

function CategoriesContent() {
    const {
        categories,
        searchQuery,
        setSearchQuery,
        loading,
        handleDeleteCategory,
        handleSaveCategory,
    } = useCategories();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState(null);

    const handleAddClick = () => {
        setCategoryToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (category) => {
        setCategoryToEdit(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCategoryToEdit(null);
    };

    return (
        <Stack gap="lg">
            {/* Page Header */}
            <Group justify="space-between" align="center">
                <div>
                    <Title order={2}>Categories Management</Title>
                    <Text size="sm" c="dimmed">
                        Manage your blog post categories and structures.
                    </Text>
                </div>
            </Group>

            {/* Category Table Component */}
            <CategoryTable
                categories={categories}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAddClick={handleAddClick}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteCategory}
                loading={loading}
            />

            {/* Add/Edit Category Modal */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveCategory}
                categoryToEdit={categoryToEdit}
            />
        </Stack>
    );
}

export default function CategoriesPage() {
    return (
        <ErrorBoundary>
            <CategoriesContent />
        </ErrorBoundary>
    );
}