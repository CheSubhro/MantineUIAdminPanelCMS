
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSEO } from '../../../hooks/useSEO';
import { showToast } from '../../../utils/toast';

describe('useSEO Custom Hook', () => {

    beforeEach(() => {
        vi.useFakeTimers();
        vi.spyOn(showToast, 'success').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('should initialize with default or provided values', () => {
        const { result } = renderHook(() => useSEO({ metaTitle: 'Test Title' }));
        
        expect(result.current.seoData.metaTitle).toBe('Test Title');
        expect(result.current.seoData.robotsTxt).toBe('User-agent: *\nAllow: /');
        expect(result.current.loading).toBe(false);
    });

    it('should update SEO field correctly', () => {
        const { result } = renderHook(() => useSEO());

        act(() => {
            result.current.updateSeoField('metaDescription', 'This is a valid meta description for testing purposes.');
        });

        expect(result.current.seoData.metaDescription).toBe('This is a valid meta description for testing purposes.');
    });

    it('should calculate correct SEO score based on title, description, and keyword', () => {
        const { result } = renderHook(() => useSEO());

        act(() => {
            result.current.updateSeoField('metaTitle', 'Learn React SEO Optimization Step by Step');
            result.current.updateSeoField('metaDescription', 'Discover how to effectively optimize your React application meta tags and search engine results pages visibility with proper guidelines.');
            result.current.updateSeoField('focusKeyword', 'React SEO');
        });

        expect(result.current.seoScore).toBe(100);
    });

    it('should handle saveSeoSettings and trigger toast on success', async () => {
        const { result } = renderHook(() => useSEO());
        const onSuccessMock = vi.fn();

        act(() => {
            result.current.saveSeoSettings(onSuccessMock);
        });

        expect(result.current.loading).toBe(true);

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.successMessage).toBe('SEO configurations updated successfully!');
        expect(showToast.success).toHaveBeenCalledWith('SEO Saved', 'Metadata and search settings updated successfully.');
        expect(onSuccessMock).toHaveBeenCalled();
    });
});