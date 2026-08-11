
import React, { useState } from 'react';
import { Table, Group, Text, ActionIcon, Avatar, Checkbox } from '@mantine/core';
import { IconEdit, IconTrash, IconFolder, IconSearch, IconPlus } from '@tabler/icons-react';
import {
    Button,
    Input,
    Badge,
    Card,
    EmptyState,
    ErrorBoundary,
    Pagination,
    ConfirmModal,
    Spinner,
    Tooltip
} from '../../../components/common';

function CategoryTableContent({
    categories,
    searchQuery,
    onSearchChange,
    onAddClick,
    onEditClick,
    onDeleteClick,
    onBulkDeleteClick, 
    loading = false
}) {
    const [deleteId, setDeleteId] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState(false);

    const [selectedIds, setSelectedIds] = useState([]);

    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 5;

    const paginatedCategories = categories.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
    );

    const handleSelectAll = (event) => {
        if (event.currentTarget.checked) {
            const allIds = categories.map((cat) => cat.id);
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((item) => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const isAllSelected = categories.length > 0 && selectedIds.length === categories.length;
    const isIndeterminate = selectedIds.length > 0 && selectedIds.length < categories.length;

    const handleDeleteConfirmClick = (id) => {
        setDeleteId(id);
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteId) {
            onDeleteClick(deleteId);
            setIsConfirmOpen(false);
            setDeleteId(null);
        }
    };

    const handleConfirmBulkDelete = () => {
        if (onBulkDeleteClick) {
            onBulkDeleteClick(selectedIds);
        } else {
            selectedIds.forEach((id) => onDeleteClick(id));
        }
        setSelectedIds([]);
        setIsBulkConfirmOpen(false);
    };

    const getShortDescription = (text) => {
        if (!text) return 'No description';
        const words = text.split(' ');
        if (words.length <= 3) return text;
        return words.slice(0, 3).join(' ') + '...';
    };

    const rows = paginatedCategories.map((category) => {
        const isSelected = selectedIds.includes(category.id);
        return (
            <Table.Tr key={category.id} bg={isSelected ? 'var(--mantine-color-default-hover)' : undefined}>
                <Table.Td>
                    <Checkbox
                        checked={isSelected}
                        onChange={() => handleSelectOne(category.id)}
                        aria-label="Select row"
                    />
                </Table.Td>
                <Table.Td>
                    <Group gap="sm">
                        <Avatar src={category.image} radius="sm" size="md" />
                        <div>
                            <Text size="sm" fw={500}>{category.name}</Text>
                            <Text size="xs" c="dimmed">/{category.slug}</Text>
                        </div>
                    </Group>
                </Table.Td>
                <Table.Td>
                    <Tooltip label={category.description || 'No description'} position="top">
                        <Text size="sm" c="dimmed">
                            {getShortDescription(category.description)}
                        </Text>
                    </Tooltip>
                </Table.Td>
                <Table.Td>
                    <Badge variant="light">
                        {category.postCount} Posts
                    </Badge>
                </Table.Td>
                <Table.Td>
                    <Badge variant="light" size="md">
                        {category.status}
                    </Badge>
                </Table.Td>
                <Table.Td>
                    <Group gap="xs" justify="flex-end">
                        <Tooltip label="Edit Category" position="top">
                            <ActionIcon
                                variant="subtle"
                                color="blue"
                                onClick={() => onEditClick(category)}
                            >
                                <IconEdit size={18} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Delete Category" position="top">
                            <ActionIcon
                                variant="subtle"
                                color="red"
                                onClick={() => handleDeleteConfirmClick(category.id)}
                            >
                                <IconTrash size={18} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <Card p="md" radius="md" withBorder>
            {/* Top Bar: Search, Add Button, and Bulk Delete Button */}
            <Group justify="space-between" mb="md" wrap="wrap">
                <Group>
                    <Input
                        placeholder="Search by name or slug..."
                        leftSection={<IconSearch size={16} />}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        w={{ base: '100%', sm: 300 }}
                    />
                    {selectedIds.length > 0 && (
                        <Button
                            color="red"
                            variant="light"
                            leftSection={<IconTrash size={16} />}
                            onClick={() => setIsBulkConfirmOpen(true)}
                        >
                            Delete Selected ({selectedIds.length})
                        </Button>
                    )}
                </Group>

                <Button
                    leftSection={<IconPlus size={16} />}
                    onClick={onAddClick}
                    color="violet"
                >
                    Add Category
                </Button>
            </Group>

            {/* Content / Table Area */}
            {loading ? (
                <Group justify="center" py="xl">
                    <Spinner size="lg" />
                </Group>
            ) : categories.length > 0 ? (
                <>
                    <Table.ScrollContainer minWidth={700}>
                        <Table verticalSpacing="sm" highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th style={{ width: 40 }}>
                                        <Checkbox
                                            checked={isAllSelected}
                                            indeterminate={isIndeterminate}
                                            onChange={handleSelectAll}
                                            aria-label="Select all rows"
                                        />
                                    </Table.Th>
                                    <Table.Th>Category</Table.Th>
                                    <Table.Th>Description</Table.Th>
                                    <Table.Th>Posts</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                    <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {rows}
                            </Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>

                    {/* Pagination Component */}
                    {categories.length > itemsPerPage && (
                        <Group justify="flex-end" mt="md">
                            <Pagination
                                total={Math.ceil(categories.length / itemsPerPage)}
                                value={activePage}
                                onChange={setActivePage}
                            />
                        </Group>
                    )}
                </>
            ) : (
                <EmptyState
                    icon={<IconFolder size={48} />}
                    title="No Categories Found"
                    description="We couldn't find any categories matching your search or criteria."
                    actionText="Add Category"
                    onAction={onAddClick}
                    actionColor="violet"
                />
            )}

            {/* Confirm Single Delete Modal */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Category"
                message="Are you sure you want to delete this category? This action cannot be undone."
                confirmText="Delete"
                confirmColor="red"
            />

            {/* Confirm Bulk Delete Modal */}
            <ConfirmModal
                isOpen={isBulkConfirmOpen}
                onClose={() => setIsBulkConfirmOpen(false)}
                onConfirm={handleConfirmBulkDelete}
                title="Delete Selected Categories"
                message={`Are you sure you want to delete ${selectedIds.length} selected categories? This action cannot be undone.`}
                confirmText="Delete All"
                confirmColor="red"
            />
        </Card>
    );
}

export default function CategoryTable(props) {
    return (
        <ErrorBoundary>
            <CategoryTableContent {...props} />
        </ErrorBoundary>
    );
}