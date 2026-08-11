
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../../hooks/useAuth';

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

describe('useAuth Custom Hook', () => {

    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should initialize with null user and correct default states', () => {
        const { result } = renderHook(() => useAuth());

        expect(result.current.user).toBeNull();
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it('should register a user successfully and navigate to login', () => {
        const { result } = renderHook(() => useAuth());

        const mockFormData = {
            username: 'johndoe',
            email: 'john@example.com',
            password: 'secretpassword',
            fullName: 'John Doe',
            role: 'Admin'
        };

        let success;
        act(() => {
            success = result.current.register(mockFormData);
        });

        expect(success).toBe(true);
        expect(result.current.user).toEqual(mockFormData);
        expect(JSON.parse(localStorage.getItem('admin_user'))).toEqual(mockFormData);
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('should login successfully with username and navigate to dashboard', () => {
        const mockFormData = {
            username: 'johndoe',
            email: 'john@example.com',
            password: 'secretpassword',
            fullName: 'John Doe'
        };
        localStorage.setItem('admin_user', JSON.stringify(mockFormData));

        const { result } = renderHook(() => useAuth());

        let success;
        act(() => {
            success = result.current.login('johndoe', 'secretpassword');
        });

        expect(success).toBe(true);
        expect(result.current.user).toEqual(mockFormData);
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    it('should login successfully with email and navigate to dashboard', () => {
        const mockFormData = {
            username: 'johndoe',
            email: 'john@example.com',
            password: 'secretpassword',
            fullName: 'John Doe'
        };
        localStorage.setItem('admin_user', JSON.stringify(mockFormData));

        const { result } = renderHook(() => useAuth());

        let success;
        act(() => {
            success = result.current.login('john@example.com', 'secretpassword');
        });

        expect(success).toBe(true);
        expect(result.current.user).toEqual(mockFormData);
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    it('should fail login if no account exists in localStorage', () => {
        const { result } = renderHook(() => useAuth());

        let success;
        act(() => {
            success = result.current.login('johndoe', 'wrongpassword');
        });

        expect(success).toBe(false);
        expect(result.current.error).toBe('No account found. Please register first.');
    });

    it('should fail login with incorrect credentials', () => {
        const mockFormData = {
            username: 'johndoe',
            email: 'john@example.com',
            password: 'secretpassword'
        };
        localStorage.setItem('admin_user', JSON.stringify(mockFormData));

        const { result } = renderHook(() => useAuth());

        let success;
        act(() => {
            success = result.current.login('johndoe', 'wrongpassword');
        });

        expect(success).toBe(false);
        expect(result.current.error).toBe('Invalid username/email or password.');
    });

    it('should logout successfully, clear user, and navigate to login', () => {
        const mockFormData = { username: 'johndoe' };
        localStorage.setItem('admin_user', JSON.stringify(mockFormData));

        const { result } = renderHook(() => useAuth());

        act(() => {
            result.current.logout();
        });

        expect(result.current.user).toBeNull();
        expect(localStorage.getItem('admin_user')).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});