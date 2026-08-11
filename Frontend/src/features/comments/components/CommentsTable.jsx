
import { Table, Group, Text, Badge as MantineBadge } from '@mantine/core';
import { Button, Badge } from '../../../components/common';
import { IconCheck, IconBan, IconTrash, IconMessageReply } from '@tabler/icons-react';

export default function CommentsTable({ comments, onApprove, onSpam, onDelete, onReply }) {
    
    if (comments.length === 0) {
        return <Text c="dimmed" ta="center" py="xl">No comments found.</Text>;
    }

    return (
        <Table verticalSpacing="sm" highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Author</Table.Th>
                    <Table.Th>Comment</Table.Th>
                    <Table.Th>In Response To</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th style={{ textAlign: 'right' }}>Actions</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {comments.map((comment) => (
                    <Table.Tr key={comment.id}>
                        <Table.Td>
                            <Text size="sm" fw={600}>{comment.author}</Text>
                            <Text size="xs" c="dimmed">{comment.email}</Text>
                        </Table.Td>
                        <Table.Td>
                            <Text size="sm" style={{ maxWidth: '300px' }}>{comment.content}</Text>
                            <Text size="xs" c="dimmed">{comment.date}</Text>
                        </Table.Td>
                        <Table.Td>
                            <Text size="sm" c="blue">{comment.postTitle}</Text>
                        </Table.Td>
                        <Table.Td>
                            <Badge>{comment.status}</Badge>
                        </Table.Td>
                        <Table.Td>
                            <Group gap="xs" justify="flex-end">
                                {comment.status !== 'approved' && (
                                    <Button
                                        size="xs"
                                        variant="light"
                                        color="green"
                                        onClick={() => onApprove(comment.id)}
                                        leftSection={<IconCheck size={14} />}
                                    >
                                        Approve
                                    </Button>
                                )}
                                {comment.status !== 'spam' && (
                                    <Button
                                        size="xs"
                                        variant="light"
                                        color="orange"
                                        onClick={() => onSpam(comment.id)}
                                        leftSection={<IconBan size={14} />}
                                    >
                                        Spam
                                    </Button>
                                )}
                                <Button
                                    size="xs"
                                    variant="light"
                                    color="blue"
                                    onClick={() => onReply(comment)}
                                    leftSection={<IconMessageReply size={14} />}
                                >
                                    Reply
                                </Button>
                                <Button
                                    size="xs"
                                    variant="light"
                                    color="red"
                                    onClick={() => onDelete(comment.id)}
                                    leftSection={<IconTrash size={14} />}
                                >
                                    Delete
                                </Button>
                            </Group>
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );
}