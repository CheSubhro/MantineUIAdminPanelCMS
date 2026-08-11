
import { renderHook, act } from '@testing-library/react';
import { useComments } from '../../../hooks/useComments';

describe('useComments Hook', () => {
    it('should initialize with default comments and filter correctly', () => {
        const { result } = renderHook(() => useComments());

        expect(result.current.comments.length).toBe(3);
        
        // Test status filtering
        act(() => {
            result.current.setStatusFilter('approved');
        });

        expect(result.current.comments.length).toBe(1);
        expect(result.current.comments[0].status).toBe('approved');
    });

    it('should approve a comment', () => {
        const { result } = renderHook(() => useComments());

        act(() => {
            result.current.handleApprove('3'); // '3' is pending
        });

        const updatedComment = result.current.comments.find(c => c.id === '3');
        expect(updatedComment.status).toBe('approved');
    });

    it('should delete a comment', () => {
        const { result } = renderHook(() => useComments());

        act(() => {
            result.current.handleDelete('1');
        });

        expect(result.current.totalCount).toBe(2);
    });
});