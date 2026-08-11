
import { Modal as MantineModal } from '@mantine/core';

export default function Modal({ isOpen, opened, onClose, title, children, size = 'md', ...props }) {
    
    const isOpened = opened !== undefined ? opened : isOpen;

    return (
        <MantineModal opened={isOpened} onClose={onClose} title={title} size={size} centered {...props}>
            {children}
        </MantineModal>
    );
}