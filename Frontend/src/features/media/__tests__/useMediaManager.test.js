
import { renderHook, act } from '@testing-library/react';
import { useMediaManager } from '../../../hooks/useMediaManager';

describe('useMediaManager Hook', () => {
    it('should initialize with default media files and closed modal', () => {
        const { result } = renderHook(() => useMediaManager());
        expect(result.current.opened).toBe(false);
        expect(result.current.mediaFiles.length).toBe(3);
    });

    it('should filter media files based on search query', () => {
        const { result } = renderHook(() => useMediaManager());
        
        act(() => {
            result.current.setSearchQuery('banner');
        });

        expect(result.current.mediaFiles.length).toBe(1);
        expect(result.current.mediaFiles[0].name).toBe('banner-image-1.jpg');
    });

    it('should delete a media file when handleDeleteFunction is called', () => {
        const { result } = renderHook(() => useMediaManager());

        act(() => {
            result.current.handleDeleteFunction(1);
        });

        expect(result.current.mediaFiles.length).toBe(2);
        expect(result.current.mediaFiles.find(f => f.id === 1)).toBeUndefined();
    });
});

