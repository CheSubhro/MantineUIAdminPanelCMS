
import { Tooltip as MantineTooltip } from '@mantine/core';

export default function Tooltip({ label, children, ...props }) {
    return (
        <MantineTooltip label={label} withArrow inline {...props}>
            {children}
        </MantineTooltip>
    );
}