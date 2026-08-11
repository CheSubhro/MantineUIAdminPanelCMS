
import { useState } from 'react';
import { showToast } from '../utils/toast';

export const useNotifications = () => {
    
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New user registered', description: 'John Doe created an account.', time: '5m ago', unread: true },
        { id: 2, title: 'New post submitted', description: 'A new blog post is pending review.', time: '1h ago', unread: true },
        { id: 3, title: 'Server backup successful', description: 'Weekly system backup completed.', time: '3h ago', unread: false },
    ]);

    const [searchQuery, setSearchQuery] = useState('');

    const filteredNotifications = notifications.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
        showToast.success('Notification Marked', 'Notification marked as read.');
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
        showToast.success('All Read', 'All notifications marked as read.');
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
        showToast.success('Notification Deleted', 'Notification has been removed successfully.');
    };

    return {
        notifications: filteredNotifications,
        totalCount: notifications.length,
        searchQuery,
        setSearchQuery,
        markAsRead,
        markAllAsRead,
        deleteNotification,
    };
};