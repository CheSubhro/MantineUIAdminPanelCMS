
import { useState, useEffect, useCallback } from 'react';
import { showToast } from '../utils/toast';
import api from '../services/api';

export const useNotifications = () => {
    
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch notifications from backend API
    const fetchNotifications = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/notifications');
            const data = response.data.data || response.data;
            if (Array.isArray(data)) {
                setNotifications(data);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch notifications.';
            showToast.error('Fetch Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const filteredNotifications = notifications.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Mark single notification as read
    const markAsRead = async (id) => {
        try {
            await api.patch(`/notifications/${id}/read`);
            setNotifications(notifications.map(n => (n._id === id || n.id === id ? { ...n, unread: false } : n)));
            showToast.success('Notification Marked', 'Notification marked as read.');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to mark notification as read.';
            showToast.error('Error', errorMessage);
        }
    };

    // Mark all notifications as read
    const markAllAsRead = async () => {
        try {
            await api.patch('/notifications/read-all');
            setNotifications(notifications.map(n => ({ ...n, unread: false })));
            showToast.success('All Read', 'All notifications marked as read.');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update notifications.';
            showToast.error('Error', errorMessage);
        }
    };

    // Delete a notification
    const deleteNotification = async (id) => {
        try {
            await api.delete(`/notifications/${id}`);
            setNotifications(notifications.filter(n => n._id !== id && n.id !== id));
            showToast.success('Notification Deleted', 'Notification has been removed successfully.');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete notification.';
            showToast.error('Error', errorMessage);
        }
    };

    return {
        notifications: filteredNotifications,
        totalCount: notifications.length,
        loading,
        searchQuery,
        setSearchQuery,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        refetchNotifications: fetchNotifications,
    };
};