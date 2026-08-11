
import { Stack } from '@mantine/core';
import { IconMessageCircleOff } from '@tabler/icons-react';
import { useComments } from '../hooks/useComments';
import CommentsTable from '../features/comments/components/CommentsTable';
import CommentsHeader from '../features/comments/components/CommentsHeader';
import CommentsToolbar from '../features/comments/components/CommentsToolbar';
import CommentReplyModal from '../features/comments/components/CommentReplyModal';
import { ErrorBoundary, EmptyState } from '../components/common';

export default function CommentsPage() {
    const {
        comments,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        handleApprove,
        handleMarkAsSpam,
        handleDelete,
        replyModalOpened,
        selectedComment,
        replyText,
        setReplyText,
        openReplyModal,
        closeReplyModal,
        handleSendReply,
    } = useComments();

    return (
        <ErrorBoundary>
            <Stack p="lg" gap="lg">
                <CommentsHeader />

                <CommentsToolbar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />

                {comments.length === 0 ? (
                    <EmptyState
                        icon={<IconMessageCircleOff size={48} />}
                        title="No Comments Found"
                        description="There are no comments matching your search or filter criteria."
                    />
                ) : (
                    <CommentsTable
                        comments={comments}
                        onApprove={handleApprove}
                        onSpam={handleMarkAsSpam}
                        onDelete={handleDelete}
                        onReply={openReplyModal}
                    />
                )}

                <CommentReplyModal
                    opened={replyModalOpened}
                    onClose={closeReplyModal}
                    selectedComment={selectedComment}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    onSend={handleSendReply}
                />
            </Stack>
        </ErrorBoundary>
    );
}