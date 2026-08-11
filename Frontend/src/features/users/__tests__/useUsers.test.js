
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUsers } from '../../../hooks/useUsers';

describe('useUsers Custom Hook', () => {
    
    it('should initialize with default users and correct count', () => {
        const { result } = renderHook(() => useUsers());

        expect(result.current.users.length).toBeGreaterThan(0);
        expect(result.current.allUsersCount).toBe(result.current.users.length);
        expect(result.current.searchQuery).toBe('');
        expect(result.current.loading).toBe(false);
    });

    it('should filter users based on search query', () => {
        const { result } = renderHook(() => useUsers());

        // Search for a specific user name
        act(() => {
            result.current.setSearchQuery('Subhro');
        });

        expect(result.current.users.length).toBe(1);
        expect(result.current.users[0].name).toContain('Subhro');
    });

    it('should add a new user successfully', () => {
        const { result } = renderHook(() => useUsers());
        const initialCount = result.current.allUsersCount;

        const newUser = {
            name: 'Test User',
            email: 'test@example.com',
            role: 'User',
            status: 'Active',
        };

        act(() => {
            result.current.handleSaveUser(newUser);
        });

        expect(result.current.allUsersCount).toBe(initialCount + 1);
        expect(result.current.users[0].name).toBe('Test User');
    });

    it('should update an existing user successfully', () => {
        const { result } = renderHook(() => useUsers());
        
        // Take the first user and update their name
        const targetUser = result.current.users[0];
        const updatedData = { ...targetUser, name: 'Updated Name' };

        act(() => {
            result.current.handleSaveUser(updatedData);
        });

        const foundUser = result.current.users.find(u => u.id === targetUser.id);
        expect(foundUser.name).toBe('Updated Name');
    });

    it('should delete a user successfully', () => {
        const { result } = renderHook(() => useUsers());
        const targetId = result.current.users[0].id;
        const initialCount = result.current.allUsersCount;

        act(() => {
            result.current.handleDeleteUser(targetId);
        });

        expect(result.current.allUsersCount).toBe(initialCount - 1);
        expect(result.current.users.some(u => u.id === targetId)).toBe(false);
    });
});