
import { Button as MantineButton } from '@mantine/core';

export default function Button({ children, color = 'violet', ...props }) {
    return (
        <MantineButton color={color} {...props}>
            {children}
        </MantineButton>
    );
}