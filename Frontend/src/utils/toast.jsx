
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, IconInfoCircle } from '@tabler/icons-react';

export const showToast = {
    success: (title, message) => {
        notifications.show({
            title: title || 'Success',
            message: message,
            color: 'teal',
            icon: <IconCheck size={18} />,
            autoClose: 3000,
        });
    },
    error: (title, message) => {
        notifications.show({
            title: title || 'Error',
            message: message || 'Something went wrong!',
            color: 'red',
            icon: <IconX size={18} />,
            autoClose: 4000,
        });
    },
    info: (title, message) => {
        notifications.show({
            title: title || 'Info',
            message: message,
            color: 'blue',
            icon: <IconInfoCircle size={18} />,
            autoClose: 3000,
        });
    }
};