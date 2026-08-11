
import { useState, useMemo } from 'react';
import { showToast } from '../utils/toast'; 

const INITIAL_USERS = [
    { id: 1, name: 'Subhro Mukherjee', email: 'subhro@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'Manager', status: 'Inactive' },
    { id: 4, name: 'Alex Johnson', email: 'alex@example.com', role: 'User', status: 'Active' },
];

export function useUsers() {
    
    const [users, setUsers] = useState(INITIAL_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

    const handleDeleteUser = (id) => {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        showToast.success('User Deleted', 'User has been removed successfully.');
    };

    const handleSaveUser = (userData) => {
        if (userData.id) {
            // Edit existing user
            setUsers((prev) =>
                prev.map((user) => (user.id === userData.id ? userData : user))
            );
            showToast.success('User Updated', 'User details updated successfully.');
        } else {
            // Add new user
            const newUser = {
                ...userData,
                id: Date.now(), 
            };
            setUsers((prev) => [newUser, ...prev]);
            showToast.success('User Created', 'New user added successfully.');
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
    };
}