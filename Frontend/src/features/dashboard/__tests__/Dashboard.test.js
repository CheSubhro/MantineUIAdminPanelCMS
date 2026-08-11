
import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDashboard } from '../../../hooks/useDashboard'; 

describe('useDashboard Custom Hook', () => {

    it('should initialize with correct default metrics and loading state', async () => {
        const { result } = renderHook(() => useDashboard());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.metrics).toEqual({
            totalViews: 45230,
            uniqueVisitors: 12450,
            totalPosts: 24,
            totalUsers: 142
        });
    });

    it('should return correct traffic sources data', () => {
        const { result } = renderHook(() => useDashboard());

        expect(result.current.trafficSources).toHaveLength(3);
        expect(result.current.trafficSources[0]).toEqual({
            source: 'Search',
            percentage: 50
        });
    });

    it('should return recent posts with correct details', () => {
        const { result } = renderHook(() => useDashboard());

        expect(result.current.recentPosts.length).toBeGreaterThan(0);
        expect(result.current.recentPosts[0].title).toBe('Mastering React and Vite');
        expect(result.current.recentPosts[0].author).toBe('Subhro Mondal');
    });

    it('should return recent users list successfully', () => {
        const { result } = renderHook(() => useDashboard());

        expect(result.current.recentUsers).toHaveLength(3);
        expect(result.current.recentUsers[0].name).toBe('Alex Johnson');
        expect(result.current.recentUsers[0].email).toBe('alex@example.com');
    });

    it('should return recent activity audit logs successfully', () => {
        const { result } = renderHook(() => useDashboard());

        expect(result.current.recentActivity).toHaveLength(3);
        expect(result.current.recentActivity[0].user).toBe('Subhro Mondal');
        expect(result.current.recentActivity[0].type).toBe('edit');
    });
});