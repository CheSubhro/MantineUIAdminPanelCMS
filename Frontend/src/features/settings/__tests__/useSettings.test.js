
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSettings } from '../../../hooks/useSettings';

describe('useSettings Custom Hook', () => {
    
    it('should initialize with default settings', () => {
        const { result } = renderHook(() => useSettings());

        expect(result.current.settings.siteName).toBe('My Application');
        expect(result.current.settings.backupFrequency).toBe('daily');
        expect(result.current.loading).toBe(false);
        expect(result.current.successMessage).toBe('');
    });

    it('should update a specific setting correctly', () => {
        const { result } = renderHook(() => useSettings());

        act(() => {
            result.current.updateSetting('siteName', 'Updated CMS Title');
        });

        expect(result.current.settings.siteName).toBe('Updated CMS Title');
    });

    it('should handle saveSettings loading state and success message', async () => {
        vi.useFakeTimers();
        const { result } = renderHook(() => useSettings());

        const onSuccessMock = vi.fn();

        act(() => {
            result.current.saveSettings(onSuccessMock);
        });

        expect(result.current.loading).toBe(true);

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.successMessage).toBe('Settings updated successfully!');
        expect(onSuccessMock).toHaveBeenCalledTimes(1);

        act(() => {
            vi.advanceTimersByTime(3000);
        });

        expect(result.current.successMessage).toBe('');

        vi.useRealTimers();
    });
});