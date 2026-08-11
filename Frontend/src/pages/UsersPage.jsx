
import { useState } from 'react';
import { Stack, Title, Text, Group } from '@mantine/core';
import { useUsers } from '../hooks/useUsers';
import UserTable from '../features/users/components/UserTable';
import UserModal from '../features/users/components/UserModal';
import { ErrorBoundary, Card } from '../components/common';

function UsersContent() {
	const {
		users,
		searchQuery,
		setSearchQuery,
		loading,
		handleDeleteUser,
		handleSaveUser,
	} = useUsers();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userToEdit, setUserToEdit] = useState(null);

	const handleAddClick = () => {
		setUserToEdit(null);
		setIsModalOpen(true);
	};

	const handleEditClick = (user) => {
		setUserToEdit(user);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setUserToEdit(null);
	};

	return (
		<Stack gap="lg">
		{/* Page Header */}
		<Group justify="space-between" align="center">
			<div>
			<Title order={2}>User Management</Title>
			<Text size="sm" c="dimmed">
				Manage system users, roles, and account statuses.
			</Text>
			</div>
		</Group>

		{/* User Table Component */}
		<UserTable
			users={users}
			searchQuery={searchQuery}
			onSearchChange={setSearchQuery}
			onAddClick={handleAddClick}
			onEditClick={handleEditClick}
			onDeleteClick={handleDeleteUser}
			loading={loading}
		/>

		{/* Add/Edit User Modal */}
		<UserModal
			isOpen={isModalOpen}
			onClose={handleCloseModal}
			onSave={handleSaveUser}
			userToEdit={userToEdit}
		/>
		</Stack>
	);
}

export default function UsersPage() {
	return (
		<ErrorBoundary>
		<UsersContent />
		</ErrorBoundary>
	);
}