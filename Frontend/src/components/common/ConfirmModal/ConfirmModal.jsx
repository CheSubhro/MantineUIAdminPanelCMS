
import { Modal, Text, Group, Button } from '@mantine/core';

export default function ConfirmModal({
    isOpen,
    opened,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    confirmText = "Confirm",
    cancelText = "Cancel",
    loading = false
}) {
    const isOpened = opened !== undefined ? opened : isOpen;

    return (
        <Modal opened={isOpened} onClose={onClose} title={title} centered>
            <Text size="sm" mb="xl">{message}</Text>
            <Group justify="end">
                <Button variant="default" onClick={onClose} disabled={loading}>{cancelText}</Button>
                <Button color="red" onClick={onConfirm} loading={loading}>{confirmText}</Button>
            </Group>
        </Modal>
    );
}