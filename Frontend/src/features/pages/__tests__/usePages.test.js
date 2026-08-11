
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePages } from '../../../hooks/usePages'; 

// Mock showToast to prevent errors during tests
vi.mock('../utils/toast', () => ({
    showToast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe('usePages Hook', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllMocks();
    });

    it('should initialize with default pages and correct states', () => {
        const { result } = renderHook(() => usePages());

        expect(result.current.pages).toHaveLength(4);
        expect(result.current.allPagesCount).toBe(4);
        expect(result.current.searchQuery).toBe('');
        expect(result.current.statusFilter).toBe('All');
        expect(result.current.loading).toBe(false);
        expect(result.current.isModalOpen).toBe(false);
        expect(result.current.pageToEdit).toBe(null);
    });

    it('should filter pages based on search query', () => {
        const { result } = renderHook(() => usePages());

        act(() => {
            result.current.setSearchQuery('privacy');
        });

        expect(result.current.pages).toHaveLength(1);
        expect(result.current.pages[0].title).toBe('Privacy Policy');
    });

    it('should filter pages based on status filter', () => {
        const { result } = renderHook(() => usePages());

        act(() => {
            result.current.setStatusFilter('Draft');
        });

        expect(result.current.pages).toHaveLength(1);
        expect(result.current.pages[0].status).toBe('Draft');
        expect(result.current.pages[0].title).toBe('Contact Us');
    });

    it('should open and close modal correctly', () => {
        const { result } = renderHook(() => usePages());
        const mockPage = { id: '1', title: 'Privacy Policy' };

        act(() => {
            result.current.handleOpenModal(mockPage);
        });

        expect(result.current.isModalOpen).toBe(true);
        expect(result.current.pageToEdit).toEqual(mockPage);

        act(() => {
            result.current.handleCloseModal();
        });

        expect(result.current.isModalOpen).toBe(false);
        expect(result.current.pageToEdit).toBe(null);
    });

    it('should create a new page successfully', async () => {
        const { result } = renderHook(() => usePages());
        const newPageData = {
            title: 'FAQ',
            slug: 'faq',
            author: 'Subhro Mondal',
            status: 'Published',
            excerpt: 'Frequently asked questions.'
        };

        act(() => {
            result.current.handleSavePage(newPageData);
        });

        expect(result.current.loading).toBe(true);

        // Fast-forward timeout
        act(() => {
            vi.advanceTimersByTime(300);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.allPagesCount).toBe(5);
        expect(result.current.pages[0].title).toBe('FAQ');
    });

    it('should update an existing page successfully', async () => {
        const { result } = renderHook(() => usePages());
        const updatedData = {
            id: '1',
            title: 'Updated Privacy Policy',
            slug: 'privacy-policy',
            author: 'Subhro Mondal',
            status: 'Published'
        };

        act(() => {
            result.current.handleSavePage(updatedData);
        });

        act(() => {
            vi.advanceTimersByTime(300);
        });

        expect(result.current.loading).toBe(false);
        const updatedPage = result.current.pages.find(p => p.id === '1');
        expect(updatedPage.title).toBe('Updated Privacy Policy');
    });

    it('should delete a page successfully', async () => {
        const { result } = renderHook(() => usePages());

        act(() => {
            result.current.handleDeletePage('1');
        });

        expect(result.current.loading).toBe(true);

        act(() => {
            vi.advanceTimersByTime(300);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.allPagesCount).toBe(3);
        expect(result.current.pages.find(p => p.id === '1')).toBeUndefined();
    });

    it('should bulk delete pages successfully', async () => {
        const { result } = renderHook(() => usePages());

        act(() => {
            result.current.handleBulkDeletePages(['1', '2']);
        });

        act(() => {
            vi.advanceTimersByTime(300);
        });

        expect(result.current.allPagesCount).toBe(2);
    });
});