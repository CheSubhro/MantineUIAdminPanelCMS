
import { Stack, Text, UnstyledButton, Group } from '@mantine/core';
import {
    IconDashboard,
    IconUsers,
    IconSettings,
    IconLogout,
    IconFileText,
    IconChartBar,
    IconArticle,
    IconBook,
    IconCategory,
    IconPhoto,
    IconMessageCircle,
    IconWorld
} from '@tabler/icons-react';
import { Tooltip, Button } from '../../common/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { PERMISSIONS } from '../../../utils/permissions';

export default function Sidebar({ onLogout }) {

    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useAuth();

    const userRole = user?.role || 'super_admin';

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: IconDashboard },
        { id: 'users', label: 'Users Management', path: '/users', icon: IconUsers },
        { id: 'categories', label: 'Categories', path: '/categories', icon: IconCategory },
        { id: 'posts', label: 'Posts', path: '/posts', icon: IconArticle },
        { id: 'pages', label: 'Pages', path: '/pages', icon: IconBook },
        { id: 'seo', label: 'SEO Management', path: '/seo', icon: IconWorld }, 
        { id: 'comments', label: 'Comments', path: '/comments', icon: IconMessageCircle },
        { id: 'media', label: 'Media Manager', path: '/media', icon: IconPhoto },
        { id: 'analytics', label: 'Analytics', path: '/analytics', icon: IconChartBar },
        { id: 'reports', label: 'Reports', path: '/reports', icon: IconFileText },
        { id: 'settings', label: 'Settings', path: '/settings', icon: IconSettings },
    ];

    const filteredMenuItems = menuItems.filter((item) =>
        PERMISSIONS.canAccessRoute(userRole, item.id)
    );

    return (
        <Stack
            h="100vh"
            justify="space-between"
            p="md"
            style={(theme) => ({
                borderRight: '1px solid var(--mantine-color-default-border)',
                backgroundColor: 'var(--mantine-color-body)',
                overflow: 'hidden'
            })}
        >
            {/* Top Menu Links */}
            <Stack
                gap="xs"
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    paddingRight: '4px'
                }}
            >
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="xs">
                    Main Menu ({userRole.replace('_', ' ')})
                </Text>

                {filteredMenuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Tooltip key={item.id} label={item.label} position="right" disabled={true}>
                            <UnstyledButton
                                onClick={() => navigate(item.path)}
                                py="xs"
                                px="md"
                                style={(theme) => ({
                                    borderRadius: theme.radius.sm,
                                    backgroundColor: isActive
                                        ? (theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.blue[0])
                                        : 'transparent',
                                    color: isActive
                                        ? (theme.colorScheme === 'dark' ? theme.white : theme.colors.blue[7])
                                        : 'var(--mantine-color-text)',
                                    '&:hover': {
                                        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                                    },
                                })}
                            >
                                <Group>
                                    <Icon size={20} />
                                    <Text size="sm" fw={isActive ? 600 : 400}>{item.label}</Text>
                                </Group>
                            </UnstyledButton>
                        </Tooltip>
                    );
                })}
            </Stack>

            {/* Bottom Logout Button */}
            <Stack pt="md" style={{ borderTop: '1px solid var(--mantine-color-default-border)', backgroundColor: 'var(--mantine-color-body)' }}>
                <Button
                    variant="subtle"
                    color="red"
                    fullWidth
                    justify="flex-start"
                    leftSection={<IconLogout size={20} />}
                    onClick={logout}
                >
                    Logout
                </Button>
            </Stack>
        </Stack>
    );
}