
import { Stack, Title, Text, Group } from '@mantine/core';
import { usePages } from '../hooks/usePages';
import PageTable from '../features/pages/components/PageTable';
import PageModal from '../features/pages/components/PageModal';
import { ErrorBoundary, CustomSelect } from '../components/common';

function PagesContent() {
    const {
        pages,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        loading,
        isModalOpen,
        pageToEdit,
        handleOpenModal,
        handleCloseModal,
        handleSavePage,
        handleDeletePage,
        handleBulkDeletePages, 
    } = usePages();

    const statusFilterOptions = [
        { value: 'All', label: 'All Statuses' },
        { value: 'Published', label: 'Published' },
        { value: 'Draft', label: 'Draft' },
    ];

    return (
        <Stack gap="lg">
            {/* Page Header */}
            <Group justify="space-between" align="center" wrap="wrap">
                <div>
                    <Title order={2}>Pages Management</Title>
                    <Text size="sm" c="dimmed">
                        Create, edit, and manage your website pages.
                    </Text>
                </div>

                {/* Status Filter Dropdown */}
                <Group w={{ base: '100%', sm: 200 }}>
                    <CustomSelect
                        placeholder="Filter by status"
                        data={statusFilterOptions}
                        value={statusFilter}
                        onChange={setStatusFilter}
                    />
                </Group>
            </Group>

            {/* Pages Table Component */}
            <PageTable
                pages={pages}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAddClick={() => handleOpenModal(null)}
                onEditClick={(page) => handleOpenModal(page)}
                onDeleteClick={handleDeletePage}
                onBulkDeleteClick={handleBulkDeletePages}
                loading={loading}
            />

            {/* Add/Edit Page Modal */}
            <PageModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSavePage}
                pageToEdit={pageToEdit}
            />
        </Stack>
    );
}

export default function PagesPage() {
    return (
        <ErrorBoundary>
            <PagesContent />
        </ErrorBoundary>
    );
}