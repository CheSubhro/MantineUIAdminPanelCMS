
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNotifications } from '../../../hooks/useNotifications';

describe('useNotifications Custom Hook', () => {
    it('should initialize with default notifications', () => {
        const { result } = renderHook(() => useNotifications());
        expect(result.current.notifications.length).toBe(3);
        expect(result.current.searchQuery).toBe('');
    });

    it('should filter notifications based on search query', () => {
        const { result } = renderHook(() => useNotifications());

        act(() => {
            result.current.setSearchQuery('backup');
        });

        expect(result.current.notifications.length).toBe(1);
        expect(result.current.notifications[0].title).toContain('backup');
    });

    it('should mark a specific notification as read', () => {
        const { result } = renderHook(() => useNotifications());

        act(() => {
            result.current.markAsRead(1);
        });

        const target = result.current.notifications.find(n => n.id === 1);
        expect(target.unread).toBe(false);
    });

    it('should delete a notification successfully', () => {
        const { result } = renderHook(() => useNotifications());
        const initialCount = result.current.totalCount;

        act(() => {
            result.current.deleteNotification(1);
        });

        expect(result.current.totalCount).toBe(initialCount - 1);
        expect(result.current.notifications.some(n => n.id === 1)).toBe(false);
    });
});