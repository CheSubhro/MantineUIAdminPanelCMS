
import { useState, useEffect, useMemo, useCallback } from 'react';
import { showToast } from '../utils/toast';
import api from '../services/api';

export function useUsers() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch all users from backend API
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/users');
            const usersData = response.data.data || response.data;
            setUsers(Array.isArray(usersData) ? usersData : []);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch users.';
            showToast.error('Fetch Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Filter users based on search query
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const name = user.name || user.fullName || '';
            const email = user.email || '';
            const role = user.role || '';
            const query = searchQuery.toLowerCase();

            return (
                name.toLowerCase().includes(query) ||
                email.toLowerCase().includes(query) ||
                role.toLowerCase().includes(query)
            );
        });
    }, [users, searchQuery]);

    // Delete user handler (Backend API: DELETE /users/:id)
    const handleDeleteUser = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            setUsers((prev) => prev.filter((user) => user._id !== id && user.id !== id));
            showToast.success('User Deleted', 'User has been removed successfully.');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete user.';
            showToast.error('Action Failed', errorMessage);
            return false;
        }
    };

    // Save/Update user handler (Backend API: PATCH /users/:id for update or POST for create)
    const handleSaveUser = async (userData) => {
        setLoading(true);
        try {
            const userId = userData._id || userData.id;

            if (userId) {
                // Edit / Update existing user using PATCH
                const formData = new FormData();
                if (userData.name || userData.fullName) formData.append('name', userData.name || userData.fullName);
                if (userData.email) formData.append('email', userData.email);
                if (userData.role) formData.append('role', userData.role);
                if (userData.status) formData.append('status', userData.status);

                if (userData.avatar instanceof File) {
                    formData.append('avatar', userData.avatar);
                }
                if (userData.coverImage instanceof File) {
                    formData.append('coverImage', userData.coverImage);
                }

                const response = await api.patch(`/users/${userId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const updatedUser = response.data.data || response.data;
                setUsers((prev) =>
                    prev.map((user) => (user._id === userId || user.id === userId ? updatedUser : user))
                );
                showToast.success('User Updated', 'User details updated successfully.');
            } else {
                const formData = new FormData();
                formData.append('name', userData.name || userData.fullName);
                formData.append('email', userData.email);
                formData.append('password', userData.password || 'Default@123');
                formData.append('role', userData.role || 'User');
                if (userData.avatar instanceof File) formData.append('avatar', userData.avatar);

                const response = await api.post('/users', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                const newUser = response.data.data || response.data;
                setUsers((prev) => [newUser, ...prev]);
                showToast.success('User Created', 'New user added successfully.');
            }
            fetchUsers();
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to save user details.';
            showToast.error('Operation Failed', errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        users: filteredUsers,
        allUsersCount: users.length,
        searchQuery,
        setSearchQuery,
        loading,
        handleDeleteUser,
        handleSaveUser,
        refetchUsers: fetchUsers,
    };
}