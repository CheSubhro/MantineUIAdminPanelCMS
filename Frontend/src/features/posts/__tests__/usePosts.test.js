
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePosts } from '../../../hooks/usePosts'; 

describe('usePosts Custom Hook', () => {

    it('should initialize with default values and correct count', () => {
        const { result } = renderHook(() => usePosts());

        expect(result.current.posts.length).toBeGreaterThan(0);
        expect(result.current.totalCount).toBe(result.current.posts.length);
        expect(result.current.searchQuery).toBe('');
        expect(result.current.loading).toBe(false);
    });

    it('should filter posts based on search query', () => {
        const { result } = renderHook(() => usePosts());

        act(() => {
            result.current.setSearchQuery('Mastering');
        });

        expect(result.current.posts.length).toBe(1);
        expect(result.current.posts[0].title).toContain('Mastering');
    });

    it('should add a new post successfully', () => {
        const { result } = renderHook(() => usePosts());
        const initialCount = result.current.totalCount;

        const newPost = {
            title: 'Understanding Tailwind CSS',
            slug: 'understanding-tailwind-css',
            excerpt: 'A deep dive into utility-first CSS framework.',
            category: 'Technology',
            author: 'Subhro Mondal',
            status: 'Published'
        };

        act(() => {
            result.current.handleSavePost(newPost);
        });

        expect(result.current.totalCount).toBe(initialCount + 1);
        expect(result.current.posts[0].title).toBe('Understanding Tailwind CSS');
    });

    it('should update an existing post successfully', () => {
        const { result } = renderHook(() => usePosts());
        
        const targetPost = result.current.posts[0];
        const updatedData = { ...targetPost, title: 'Mastering React and Vite (Updated)' };

        act(() => {
            result.current.handleSavePost(updatedData);
        });

        const foundPost = result.current.posts.find(post => post.id === targetPost.id);
        expect(foundPost.title).toBe('Mastering React and Vite (Updated)');
    });

    it('should delete a post successfully', () => {
        const { result } = renderHook(() => usePosts());
        const targetId = result.current.posts[0].id;
        const initialCount = result.current.totalCount;

        act(() => {
            result.current.handleDeletePost(targetId);
        });

        expect(result.current.totalCount).toBe(initialCount - 1);
        expect(result.current.posts.some(post => post.id === targetId)).toBe(false);
    });
});