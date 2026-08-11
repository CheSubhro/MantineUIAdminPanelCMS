
import React, { useState } from 'react';
import { Table, Group, Text, ActionIcon, Checkbox } from '@mantine/core';
import { IconEdit, IconTrash, IconFileText, IconSearch, IconPlus } from '@tabler/icons-react';
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

function PageTableContent({
    pages,
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

    const paginatedPages = pages.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
    );

    const handleSelectAll = (event) => {
        if (event.currentTarget.checked) {
            const allIds = pages.map((page) => page.id);
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

    const isAllSelected = pages.length > 0 && selectedIds.length === pages.length;
    const isIndeterminate = selectedIds.length > 0 && selectedIds.length < pages.length;

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

    const getShortExcerpt = (text) => {
        if (!text) return 'No excerpt available';
        const words = text.split(' ');
        if (words.length <= 4) return text;
        return words.slice(0, 4).join(' ') + '...';
    };

    const rows = paginatedPages.map((page) => {
        const isSelected = selectedIds.includes(page.id);
        return (
            <Table.Tr key={page.id} bg={isSelected ? 'var(--mantine-color-default-hover)' : undefined}>
                <Table.Td>
                    <Checkbox
                        checked={isSelected}
                        onChange={() => handleSelectOne(page.id)}
                        aria-label="Select row"
                    />
                </Table.Td>
                <Table.Td>
                    <div>
                        <Text size="sm" fw={500}>{page.title}</Text>
                        <Text size="xs" c="dimmed">/{page.slug}</Text>
                    </div>
                </Table.Td>
                <Table.Td>
                    <Text size="sm" c="dimmed">{page.author}</Text>
                </Table.Td>
                <Table.Td>
                    <Tooltip label={page.excerpt || 'No excerpt'} position="top">
                        <Text size="sm" c="dimmed">
                            {getShortExcerpt(page.excerpt)}
                        </Text>
                    </Tooltip>
                </Table.Td>
                <Table.Td>
                    <Text size="sm" c="dimmed">{page.updatedAt || 'N/A'}</Text>
                </Table.Td>
                <Table.Td>
                    <Badge variant="light" size="md">
                        {page.status}
                    </Badge>
                </Table.Td>
                <Table.Td>
                    <Group gap="xs" justify="flex-end">
                        <Tooltip label="Edit Page" position="top">
                            <ActionIcon
                                variant="subtle"
                                color="blue"
                                onClick={() => onEditClick(page)}
                            >
                                <IconEdit size={18} />
                            </ActionIcon>
                        </Tooltip>

                        <Tooltip label="Delete Page" position="top">
                            <ActionIcon
                                variant="subtle"
                                color="red"
                                onClick={() => handleDeleteConfirmClick(page.id)}
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
                        placeholder="Search by title, slug, or author..."
                        leftSection={<IconSearch size={16} />}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        w={{ base: '100%', sm: 320 }}
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
                    Add Page
                </Button>
            </Group>

            {/* Content / Table Area */}
            {loading ? (
                <Group justify="center" py="xl">
                    <Spinner size="lg" />
                </Group>
            ) : pages.length > 0 ? (
                <>
                    <Table.ScrollContainer minWidth={800}>
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
                                    <Table.Th>Page</Table.Th>
                                    <Table.Th>Author</Table.Th>
                                    <Table.Th>Excerpt</Table.Th>
                                    <Table.Th>Updated At</Table.Th>
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
                    {pages.length > itemsPerPage && (
                        <Group justify="flex-end" mt="md">
                            <Pagination
                                total={Math.ceil(pages.length / itemsPerPage)}
                                value={activePage}
                                onChange={setActivePage}
                            />
                        </Group>
                    )}
                </>
            ) : (
                <EmptyState
                    icon={<IconFileText size={48} />}
                    title="No Pages Found"
                    description="We couldn't find any website pages matching your search or criteria."
                    actionText="Add Page"
                    onAction={onAddClick}
                    actionColor="violet"
                />
            )}

            {/* Confirm Single Delete Modal */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Page"
                message="Are you sure you want to delete this website page? This action cannot be undone."
                confirmText="Delete"
                confirmColor="red"
            />

            {/* Confirm Bulk Delete Modal */}
            <ConfirmModal
                isOpen={isBulkConfirmOpen}
                onClose={() => setIsBulkConfirmOpen(false)}
                onConfirm={handleConfirmBulkDelete}
                title="Delete Selected Pages"
                message={`Are you sure you want to delete ${selectedIds.length} selected website pages? This action cannot be undone.`}
                confirmText="Delete All"
                confirmColor="red"
            />
        </Card>
    );
}

export default function PageTable(props) {
    return (
        <ErrorBoundary>
            <PageTableContent {...props} />
        </ErrorBoundary>
    );
}