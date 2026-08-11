
import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function ThemeToggle() {
    
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="subtle"
            size="lg"
            radius="xl"
            aria-label="Toggle color scheme"
        >
            {computedColorScheme === 'light' ? (
                <IconMoon size={20} stroke={1.5} />
            ) : (
                <IconSun size={20} stroke={1.5} />
            )}
        </ActionIcon>
    );
}