
import { renderHook, act } from '@testing-library/react';
import { useAnalytics } from '../../../hooks/useAnalytics';
import { describe, it, expect } from 'vitest';

describe('useAnalytics Custom Hook', () => {
    it('should initialize with default 7days analytics data', () => {
        const { result } = renderHook(() => useAnalytics());

        expect(result.current.timeRange).toBe('7days');
        expect(result.current.metrics.totalViews).toBe(45230);
        expect(result.current.trafficOverTime.length).toBe(7);
        expect(result.current.popularPosts.length).toBe(3);
    });

    it('should change metrics and traffic when timeRange changes', () => {
        const { result } = renderHook(() => useAnalytics());

        act(() => {
            result.current.setTimeRange('30days');
        });

        expect(result.current.timeRange).toBe('30days');
        expect(result.current.metrics.totalViews).toBe(185000);
        expect(result.current.trafficOverTime.length).toBe(4);
    });
});