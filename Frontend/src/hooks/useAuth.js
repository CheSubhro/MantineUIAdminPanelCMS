
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../utils/toast';

export const useAuth = () => {
    
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('admin_user')) || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Register Handler
    const register = (formData) => {
        setLoading(true);
        setError(null);
        try {
            // Saving mock user data to localStorage
            localStorage.setItem('admin_user', JSON.stringify(formData));
            setUser(formData);
            setLoading(false);
            showToast.success('Registration Successful', 'Please login with your credentials.');
            navigate('/login');
            return true;
        } catch (err) {
            setError('Registration failed. Please try again.');
            setLoading(false);
            showToast.error('Registration Failed', 'Please try again.');
            return false;
        }
    };

    // Login Handler (supports both username or email in a single input)
    const login = (identifier, password) => {
        setLoading(true);
        setError(null);
        
        const storedUser = JSON.parse(localStorage.getItem('admin_user'));

        if (!storedUser) {
            setError('No account found. Please register first.');
            setLoading(false);
            showToast.error('Account Not Found', 'Please register first.');
            return false;
        }

        const isMatch = 
            (storedUser.username === identifier || storedUser.email === identifier) && 
            storedUser.password === password;

        if (isMatch) {
            setUser(storedUser);
            setLoading(false);
            showToast.success('Welcome Back', 'Logged in successfully.');
            navigate('/dashboard');
            return true;
        } else {
            setError('Invalid username/email or password.');
            setLoading(false);
            showToast.error('Login Failed', 'Invalid username/email or password.');
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