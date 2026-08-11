
import React, { useState } from 'react';
import { Title, Text, Group, Box, Stack } from '@mantine/core';
import { Card, Button, Modal, Input } from '../../../components/common';

const DangerZoneSection = ({ onDeleteAccount, loading }) => {
    
    const [deleteModalOpened, setDeleteModalOpened] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState('');

    const handleConfirmDelete = () => {
        onDeleteAccount(deleteConfirmText, () => setDeleteModalOpened(false));
    };

    return (
        <>
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ borderColor: '#ffa8a8', backgroundColor: '#fff5f5' }}>
                <Group justify="space-between" align="center">
                    <Box>
                        <Title order={3} c="red.7" mb={4}>4. Danger Zone</Title>
                        <Text size="sm" c="dimmed">Irreversible and permanent actions. Please be careful.</Text>
                    </Box>
                    <Button
                        color="red"
                        onClick={() => setDeleteModalOpened(true)}
                    >
                        Delete Account
                    </Button>
                </Group>
            </Card>

            <Modal
                opened={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                title="Are you absolutely sure?"
            >
                <Stack spacing="sm">
                    <Text size="sm" c="dimmed">
                        This action cannot be undone. This will permanently delete your account and remove your data.
                    </Text>

                    <Text size="sm" fw={500}>
                        Please type <Text span fw={700} c="red">DELETE</Text> to confirm.
                    </Text>

                    <Input
                        placeholder="Type DELETE"
                        value={deleteConfirmText}
                        onChange={(e) => setDeleteConfirmText(e.target.value)}
                    />

                    <Group justify="flex-end" mt="md" spacing="sm">
                        <Button variant="default" onClick={() => setDeleteModalOpened(false)}>
                            Cancel
                        </Button>
                        <Button
                            color="red"
                            loading={loading}
                            disabled={deleteConfirmText !== 'DELETE'}
                            onClick={handleConfirmDelete}
                        >
                            {loading ? 'Deleting...' : 'Yes, Delete Account'}
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </>
    );
};

export default DangerZoneSection;