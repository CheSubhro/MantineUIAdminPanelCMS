
import { Stack, Title, Text, Group } from '@mantine/core';
import { usePosts } from '../hooks/usePosts';
import PostsTable from '../features/posts/components/PostTable';
import PostModal from '../features/posts/components/PostModal';
import { ErrorBoundary, CustomSelect } from '../components/common';

function PostsContent() {
    const {
        posts,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        loading,
        isModalOpen,
        postToEdit,
        handleOpenModal,
        handleCloseModal,
        handleSavePost,
        handleDeletePost,
    } = usePosts();

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
                    <Title order={2}>Posts Management</Title>
                    <Text size="sm" c="dimmed">
                        Create, edit, and manage your blog posts and articles.
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

            {/* Posts Table Component */}
            <PostsTable
                posts={posts}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onAddClick={() => handleOpenModal(null)}
                onEditClick={(post) => handleOpenModal(post)}
                onDeleteClick={handleDeletePost}
                loading={loading}
            />

            {/* Add/Edit Post Modal */}
            <PostModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSavePost}
                postToEdit={postToEdit}
            />
        </Stack>
    );
}

export default function PostsPage() {
    return (
        <ErrorBoundary>
            <PostsContent />
        </ErrorBoundary>
    );
}