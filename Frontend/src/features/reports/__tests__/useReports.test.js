
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useReports } from '../../../hooks/useReports';

describe('useReports Custom Hook', () => {
    it('should initialize with default post-performance report and 30days range', () => {
        const { result } = renderHook(() => useReports());

        expect(result.current.reportType).toBe('post-performance');
        expect(result.current.timeRange).toBe('30days');
        expect(result.current.currentReportData.length).toBeGreaterThan(0);
    });

    it('should filter report data based on search query', () => {
        const { result } = renderHook(() => useReports());

        act(() => {
            result.current.setSearchQuery('Mantine');
        });

        expect(result.current.currentReportData).toHaveLength(1);
        expect(result.current.currentReportData[0].title).toContain('Mantine');
    });

    it('should switch report type successfully', () => {
        const { result } = renderHook(() => useReports());

        act(() => {
            result.current.setReportType('author-contribution');
        });

        expect(result.current.reportType).toBe('author-contribution');
        expect(result.current.currentReportData[0]).toHaveProperty('author');
        expect(result.current.currentReportData[0]).toHaveProperty('totalPosts');
    });
});