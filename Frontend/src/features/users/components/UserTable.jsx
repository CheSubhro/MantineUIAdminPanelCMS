
import { Table, Group, Text, ActionIcon } from '@mantine/core';
import { IconSearch, IconPlus, IconEdit, IconTrash, IconUsers } from '@tabler/icons-react';
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
import { useState } from 'react';

function UserTableContent({
    users,
    searchQuery,
    onSearchChange,
    onAddClick,
    onEditClick,
    onDeleteClick,
    loading = false
}) {
    const [deleteId, setDeleteId] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 5;

    const paginatedUsers = users.slice(
        (activePage - 1) * itemsPerPage,
        activePage * itemsPerPage
    );

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

    const rows = paginatedUsers.map((user) => (
        <Table.Tr key={user.id}>
            <Table.Td>
                <Text size="sm" fw={500}>{user.name}</Text>
            </Table.Td>
            <Table.Td>
                <Text size="sm" c="dimmed">{user.email}</Text>
            </Table.Td>
            <Table.Td>
                <Badge variant="light" color="blue">{user.role}</Badge>
            </Table.Td>
            <Table.Td>
                <Badge variant="light" size="md">
                    {user.status}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Group gap="xs" justify="flex-end">
                    <Tooltip label="Edit User" position="top">
                        <ActionIcon
                            variant="subtle"
                            color="blue"
                            onClick={() => onEditClick(user)}
                        >
                            <IconEdit size={18} />
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Delete User" position="top">
                        <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleDeleteConfirmClick(user.id)}
                        >
                            <IconTrash size={18} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card p="md" radius="md" withBorder>
            {/* Top Bar: Search and Add Button */}
            <Group justify="space-between" mb="md" wrap="wrap">
                <Input
                    placeholder="Search by name, email, or role..."
                    leftSection={<IconSearch size={16} />}
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    w={{ base: '100%', sm: 300 }}
                />
                <Button
                    leftSection={<IconPlus size={16} />}
                    onClick={onAddClick}
                >
                    Add New User
                </Button>
            </Group>

            {/* Content / Table Area */}
            {loading ? (
                <Group justify="center" py="xl">
                    <Spinner size="lg" />
                </Group>
            ) : users.length > 0 ? (
                <>
                    <Table.ScrollContainer minWidth={500}>
                        <Table verticalSpacing="sm" highlightOnHover>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Name</Table.Th>
                                    <Table.Th>Email</Table.Th>
                                    <Table.Th>Role</Table.Th>
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
                    {users.length > itemsPerPage && (
                        <Group justify="flex-end" mt="md">
                            <Pagination
                                total={Math.ceil(users.length / itemsPerPage)}
                                value={activePage}
                                onChange={setActivePage}
                            />
                        </Group>
                    )}
                </>
            ) : (
                <EmptyState
                    icon={<IconUsers size={48} />}
                    title="No Users Found"
                    description="We couldn't find any users matching your search or criteria."
                    actionText="Add New User"
                    onAction={onAddClick}
                    actionColor="violet"
                />
            )}

            {/* Confirm Delete Modal */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone."
                confirmText="Delete"
                confirmColor="red"
            />
        </Card>
    );
}

export default function UserTable(props) {
    return (
        <ErrorBoundary>
            <UserTableContent {...props} />
        </ErrorBoundary>
    );
}