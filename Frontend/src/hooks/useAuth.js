
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
            data.append('name', formData.fullName); 
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

    // Login Handler (supports both username or email in a single input)
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
            useNavigateInstance('/dashboard');
            return true;

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Invalid username/email or password.';
            setError(errorMessage);
            setLoading(false);
            showToast.error('Login Failed', errorMessage);
            return false;
        }
    };

    // Update Profile Handler
    const updateUserProfile = async (updatedData) => {
        setLoading(true);
        try {
            const storedUser = JSON.parse(localStorage.getItem('admin_user')) || {};
            const newUserData = { ...storedUser, ...updatedData };
            
            localStorage.setItem('admin_user', JSON.stringify(newUserData));
            setUser(newUserData);
            setLoading(false);
            showToast.success('Profile Updated', 'Your profile details updated successfully.');
            return true;
        } catch (err) {
            setError('Failed to update profile.');
            setLoading(false);
            showToast.error('Update Failed', 'Failed to update profile.');
            throw err;
        }
    };

    // Delete Account Handler
    const deleteAccount = async () => {
        setLoading(true);
        try {
            localStorage.removeItem('admin_user');
            setUser(null);
            setLoading(false);
            showToast.success('Account Deleted', 'Your account has been removed successfully.');
            navigate('/login');
            return true;
        } catch (err) {
            setError('Failed to delete account.');
            setLoading(false);
            showToast.error('Action Failed', 'Failed to delete account.');
            throw err;
        }
    };

    // Logout Handler
    const logout = () => {
        localStorage.removeItem('admin_user');
        setUser(null);
        showToast.success('Logged Out', 'You have been logged out successfully.');
        navigate('/login');
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