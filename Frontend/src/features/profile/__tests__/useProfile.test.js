
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../../hooks/useAuth';

// Mock useNavigate so Router is not required
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
useNavigate: () => mockNavigate,
}));

describe('useProfile Custom Hook', () => {
beforeEach(() => {
localStorage.clear();
mockNavigate.mockClear();
});


it('should initialize with null user and default states', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
});

it('should load logged-in user from localStorage', () => {
    const loggedInUser = {
        fullName: 'Subhro Mondal',
        username: 'subhro',
        email: 'subhro@example.com',
        password: 'password123',
        role: 'Admin',
    };

    localStorage.setItem(
        'admin_user',
        JSON.stringify(loggedInUser)
    );

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(loggedInUser);
    expect(result.current.user.fullName).toBe('Subhro Mondal');
    expect(result.current.user.email).toBe('subhro@example.com');
    expect(result.current.user.username).toBe('subhro');
    expect(result.current.user.role).toBe('Admin');
});

it('should logout and clear the user', () => {
    const loggedInUser = {
        fullName: 'Subhro Mondal',
        username: 'subhro',
        email: 'subhro@example.com',
        password: 'password123',
        role: 'Admin',
    };

    localStorage.setItem(
        'admin_user',
        JSON.stringify(loggedInUser)
    );

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toEqual(loggedInUser);

    act(() => {
        result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(
        localStorage.getItem('admin_user')
    ).toBeNull();

    expect(mockNavigate).toHaveBeenCalledWith('/login');
});

});
