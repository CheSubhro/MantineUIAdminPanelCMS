
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Text, TextInput, Group } from '@mantine/core';
import { Modal, Button } from '../../../components/common';
import { commentReplySchema } from '../../../utils/validators';

export default function CommentReplyModal({ opened, onClose, selectedComment, onSend }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(commentReplySchema),
        defaultValues: {
            replyText: '',
        },
    });

    useEffect(() => {
        if (opened) {
            reset({ replyText: '' });
        }
    }, [opened, reset]);

    const handleFormSubmit = (data) => {
        onSend(data.replyText);
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={`Reply to ${selectedComment?.author || 'Comment'}`}
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack gap="md">
                    <Text size="sm" c="dimmed">
                        Original Comment: "{selectedComment?.content}"
                    </Text>

                    <TextInput
                        label="Your Reply"
                        placeholder="Type your reply here..."
                        error={errors.replyText?.message}
                        {...register('replyText')}
                    />

                    <Group justify="flex-end">
                        <Button variant="default" onClick={onClose} type="button">
                            Cancel
                        </Button>
                        <Button color="violet" type="submit">
                            Send Reply
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}