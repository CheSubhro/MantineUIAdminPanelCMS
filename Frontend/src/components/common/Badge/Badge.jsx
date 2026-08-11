
import React from 'react';
import { Badge as MantineBadge } from '@mantine/core';

export default function Badge({ children, color, variant = 'light', size = 'md', ...props }) {

    let badgeColor = color;
    let label = children;

    if (typeof children === 'string') {
        const lowerStatus = children.toLowerCase();

        switch (lowerStatus) {
            case 'approved':
            case 'published':
            case 'active':
            case 'enabled':
                badgeColor = badgeColor || 'green';
                break;
            case 'pending':
            case 'draft':
                badgeColor = badgeColor || 'yellow';
                break;
            case 'spam':
            case 'inactive':
            case 'disabled':
            case 'banned':
                badgeColor = badgeColor || 'red';
                break;
            default:
                badgeColor = badgeColor || 'gray';
        }

        label = lowerStatus.charAt(0).toUpperCase() + lowerStatus.slice(1);
    }

    return (
        <MantineBadge
            color={badgeColor}
            variant={variant}
            size={size}
            fullWidth={false}
            style={{ textTransform: 'capitalize' }}
            {...props}
        >
            {label}
        </MantineBadge>
    );
}