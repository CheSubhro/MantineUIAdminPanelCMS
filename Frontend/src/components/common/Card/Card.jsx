
import { Card as MantineCard } from '@mantine/core';

export default function Card({ children, className = '', ...props }) {
    return (
        <MantineCard
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={className}
            {...props}
        >
            {children}
        </MantineCard>
    );
}