
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../../hooks/useAuth';

// Mock react-router-dom navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

// Mock toast utility
vi.mock('../utils/toast', () => ({
    showToast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe('useAuth Custom Hook', () => {

    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should initialize with null user when localStorage is empty', () => {
        const { result } = renderHook(() => useAuth());

        expect(result.current.user).toBeNull();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should register a new user successfully and navigate to login', () => {
        const { result } = renderHook(() => useAuth());

        const formData = {
            fullName: 'Test Admin',
            username: 'testadmin',
            email: 'test@example.com',
            password: 'password123',
        };

        let success;
        act(() => {
            success = result.current.register(formData);
        });

        expect(success).toBe(true);
        expect(result.current.user).toEqual(formData);
        expect(JSON.parse(localStorage.getItem('admin_user'))).toEqual(formData);
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('should login successfully with valid username and password', () => {
        const mockUser = {
            username: 'johndoe',
            email: 'john@example.com',
            password: 'securepassword',
        };
        localStorage.setItem('admin_user', JSON.stringify(mockUser));

        const { result } = renderHook(() => useAuth());

        let success;
        act(() => {
            success = result.current.login('johndoe', 'securepassword');
        });

        expect(success).toBe(true);
        expect(result.current.user).toEqual(mockUser);
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    it('should fail login if password or identifier is incorrect', () => {
        const mockUser = {
            username: 'johndoe',
            email: 'john@example.com',
            password: 'securepassword',
        };
        localStorage.setItem('admin_user', JSON.stringify(mockUser));

        const { result } = renderHook(() => useAuth());

        let success;
        act(() => {
            success = result.current.login('johndoe', 'wrongpassword');
        });

        expect(success).toBe(false);
        expect(result.current.error).toBe('Invalid username/email or password.');
    });

    it('should update user profile successfully', async () => {
        const initialUser = { fullName: 'John Doe', username: 'johndoe' };
        localStorage.setItem('admin_user', JSON.stringify(initialUser));

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.updateUserProfile({ fullName: 'John Updated' });
        });

        expect(result.current.user.fullName).toBe('John Updated');
        const stored = JSON.parse(localStorage.getItem('admin_user'));
        expect(stored.fullName).toBe('John Updated');
    });

    it('should delete account successfully and clear localStorage', async () => {
        const initialUser = { fullName: 'John Doe', username: 'johndoe' };
        localStorage.setItem('admin_user', JSON.stringify(initialUser));

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            await result.current.deleteAccount();
        });

        expect(result.current.user).toBeNull();
        expect(localStorage.getItem('admin_user')).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('should logout user and clear local storage', () => {
        const initialUser = { fullName: 'John Doe', username: 'johndoe' };
        localStorage.setItem('admin_user', JSON.stringify(initialUser));

        const { result } = renderHook(() => useAuth());

        act(() => {
            result.current.logout();
        });

        expect(result.current.user).toBeNull();
        expect(localStorage.getItem('admin_user')).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});