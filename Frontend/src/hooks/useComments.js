
import { useState, useEffect, useMemo, useCallback } from 'react';
import { showToast } from '../utils/toast';
import api from '../services/api';

export function useComments() {
    
    const [comments, setComments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'approved', 'pending', 'spam'
    const [loading, setLoading] = useState(false);

    // Reply modal state
    const [replyModalOpened, setReplyModalOpened] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [replyText, setReplyText] = useState('');

    // Fetch all comments from backend API
    const fetchComments = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/comments');
            const commentsData = response.data.data || response.data;
            setComments(Array.isArray(commentsData) ? commentsData : []);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch comments.';
            showToast.error('Fetch Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    // Filter comments based on search query and status
    const filteredComments = useMemo(() => {
        return comments.filter((comment) => {
            const author = comment.author || '';
            const content = comment.content || '';
            const postTitle = comment.postTitle || '';
            const query = searchQuery.toLowerCase();

            const matchesSearch = 
                author.toLowerCase().includes(query) ||
                content.toLowerCase().includes(query) ||
                postTitle.toLowerCase().includes(query);
            
            const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [comments, searchQuery, statusFilter]);

    // Helper to get correct ID (_id or id)
    const getId = (comment) => comment._id || comment.id;

    // Handle Approve (Update status via PATCH)
    const handleApprove = async (id) => {
        try {
            await api.patch(`/comments/${id}`, { status: 'approved' });
            setComments((prev) => 
                prev.map((c) => (getId(c) === id ? { ...c, status: 'approved' } : c))
            );
            showToast.success('Comment Approved', 'The comment has been approved successfully.');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to approve comment.';
            showToast.error('Action Failed', errorMessage);
        }
    };

    // Handle Spam (Update status via PATCH)
    const handleMarkAsSpam = async (id) => {
        try {
            await api.patch(`/comments/${id}`, { status: 'spam' });
            setComments((prev) => 
                prev.map((c) => (getId(c) === id ? { ...c, status: 'spam' } : c))
            );
            showToast.warning('Marked as Spam', 'The comment has been marked as spam.');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to mark comment as spam.';
            showToast.error('Action Failed', errorMessage);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        try {
            await api.delete(`/comments/${id}`);
            setComments((prev) => prev.filter((c) => getId(c) !== id));
            showToast.success('Comment Deleted', 'The comment has been removed successfully.');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete comment.';
            showToast.error('Action Failed', errorMessage);
        }
    };

    // Handle Bulk Delete
    const handleBulkDelete = async (ids) => {
        if (!ids || ids.length === 0) return;
        setLoading(true);
        try {
            await api.delete('/comments/bulk', { data: { ids } });
            setComments((prev) => prev.filter((c) => !ids.includes(getId(c))));
            showToast.success('Comments Deleted', `${ids.length} comments have been removed successfully.`);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to bulk delete comments.';
            showToast.error('Action Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Handle Reply Open/Close
    const openReplyModal = (comment) => {
        setSelectedComment(comment);
        setReplyText('');
        setReplyModalOpened(true);
    };

    const closeReplyModal = () => {
        setReplyModalOpened(false);
        setSelectedComment(null);
        setReplyText('');
    };

    // Send Reply via POST endpoint
    const handleSendReply = async () => {
        if (!replyText.trim() || !selectedComment) return;
        const commentId = getId(selectedComment);

        try {
            await api.post(`/comments/${commentId}`, { replyContent: replyText });
            showToast.success('Reply Sent', 'Your reply has been sent successfully.');
            closeReplyModal();
            fetchComments();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to send reply.';
            showToast.error('Reply Failed', errorMessage);
        }
    };

    return {
        comments: filteredComments,
        totalCount: comments.length,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        loading,
        replyModalOpened,
        selectedComment,
        replyText,
        setReplyText,
        handleApprove,
        handleMarkAsSpam,
        handleDelete,
        handleBulkDelete,
        openReplyModal,
        closeReplyModal,
        handleSendReply,
        refetchComments: fetchComments,
    };
}