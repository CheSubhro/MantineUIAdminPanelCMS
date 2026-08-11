
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCategories } from '../../../hooks/useCategories'; 

describe('useCategories Custom Hook', () => {

    it('should initialize with default values and correct count', () => {
        const { result } = renderHook(() => useCategories());

        expect(result.current.categories.length).toBeGreaterThan(0);
        expect(result.current.totalCount).toBe(result.current.categories.length);
        expect(result.current.searchQuery).toBe('');
        expect(result.current.loading).toBe(false);
    });

    it('should filter categories based on search query', () => {
        const { result } = renderHook(() => useCategories());

        act(() => {
            result.current.setSearchQuery('Technology');
        });

        expect(result.current.categories.length).toBe(1);
        expect(result.current.categories[0].name).toContain('Technology');
    });

    it('should add a new category successfully', () => {
        const { result } = renderHook(() => useCategories());
        const initialCount = result.current.totalCount;

        const newCategory = {
            name: 'Books',
            slug: 'books',
            description: 'Books and literature',
            status: 'Active'
        };

        act(() => {
            result.current.handleSaveCategory(newCategory);
        });

        expect(result.current.totalCount).toBe(initialCount + 1);
        expect(result.current.categories[0].name).toBe('Books');
    });

    it('should update an existing category successfully', () => {
        const { result } = renderHook(() => useCategories());
        
        const targetCategory = result.current.categories[0];
        const updatedData = { ...targetCategory, name: 'Advanced Tech' };

        act(() => {
            result.current.handleSaveCategory(updatedData);
        });

        const foundCategory = result.current.categories.find(cat => cat.id === targetCategory.id);
        expect(foundCategory.name).toBe('Advanced Tech');
    });

    it('should delete a category successfully', () => {
        const { result } = renderHook(() => useCategories());
        const targetId = result.current.categories[0].id;
        const initialCount = result.current.totalCount;

        act(() => {
            result.current.handleDeleteCategory(targetId);
        });

        expect(result.current.totalCount).toBe(initialCount - 1);
        expect(result.current.categories.some(cat => cat.id === targetId)).toBe(false);
    });
});