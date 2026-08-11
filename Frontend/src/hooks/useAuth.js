
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/toast';
import api from '../services/api';

export const useAuth = () => {
    
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('admin_user')) || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Register Handler
    const register = async (formData) => {
        setLoading(true);
        setError(null);
        
        try {
            const data = new FormData();
            data.append('name', formData.fullName || formData.name); 
            data.append('username', formData.username);
            data.append('email', formData.email);
            data.append('password', formData.password);
            data.append('role', formData.role);

            if (formData.avatar) {
                data.append('avatar', formData.avatar);
            }
            if (formData.coverImage) {
                data.append('coverImage', formData.coverImage);
            }

            const response = await api.post('/auth/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setLoading(false);
            showToast.success('Registration Successful', response.data.message || 'Please login with your credentials.');
            navigate('/login');
            return true;

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(errorMessage);
            setLoading(false);
            showToast.error('Registration Failed', errorMessage);
            return false;
        }
    };

    // Login Handler
    const login = async (identifier, password) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await api.post('/auth/login', {
                identifier,
                password
            });

            const { user, accessToken } = response.data.data;

            localStorage.setItem('admin_user', JSON.stringify(user));
            if (accessToken) {
                localStorage.setItem('token', accessToken);
            }

            setUser(user);
            setLoading(false);
            showToast.success('Welcome Back', response.data.message || 'Logged in successfully.');
            navigate('/dashboard'); 
            return true;

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Invalid username/email or password.';
            setError(errorMessage);
            setLoading(false);
            showToast.error('Login Failed', errorMessage);
            return false;
        }
    };

    // Update Profile Handler (Integrated with PUT /auth/update backend API)
    const updateUserProfile = async (updatedData) => {
        setLoading(true);
        setError(null);

        try {
            const data = new FormData();
            if (updatedData.fullName || updatedData.name) {
                data.append('name', updatedData.fullName || updatedData.name);
            }
            if (updatedData.username) data.append('username', updatedData.username);
            if (updatedData.email) data.append('email', updatedData.email);
            if (updatedData.password) data.append('password', updatedData.password);

            if (updatedData.avatar instanceof File) {
                data.append('avatar', updatedData.avatar);
            }
            if (updatedData.coverImage instanceof File) {
                data.append('coverImage', updatedData.coverImage);
            }

            const response = await api.put('/auth/update', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const updatedUser = response.data.data;
            localStorage.setItem('admin_user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setLoading(false);
            showToast.success('Profile Updated', 'Your profile details updated successfully.');
            return true;

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update profile.';
            setError(errorMessage);
            setLoading(false);
            showToast.error('Update Failed', errorMessage);
            throw err;
        }
    };

    // Delete Account Handler (Fixed endpoint to match /auth/delete)
    const deleteAccount = async () => {
        setLoading(true);
        try {
            await api.delete('/auth/delete'); 
            localStorage.removeItem('admin_user');
            localStorage.removeItem('token');
            setUser(null);
            setLoading(false);
            showToast.success('Account Deleted', 'Your account has been removed successfully.');
            navigate('/login');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete account.';
            setError(errorMessage);
            setLoading(false);
            showToast.error('Action Failed', errorMessage);
            throw err;
        }
    };

    // Logout Handler
    const logout = async () => {
        try {
            await api.post('/auth/logout'); 
        } catch (err) {
            console.error('Logout API error:', err);
        } finally {
            localStorage.removeItem('admin_user');
            localStorage.removeItem('token');
            setUser(null);
            showToast.success('Logged Out', 'You have been logged out successfully.');
            navigate('/login');
        }
    };

    return {
        user,
        loading,
        error,
        register,
        login,
        updateUserProfile,
        deleteAccount,
        logout
    };
};