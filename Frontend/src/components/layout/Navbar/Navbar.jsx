
import { Group, Burger, Text, ActionIcon, Avatar, Menu, Box, ScrollArea } from '@mantine/core';
import { IconBell, IconSettings, IconLogout, IconUser, IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Badge, ThemeToggle } from '../../common';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';

export default function Navbar({ opened, toggle, user = { name: 'Admin User', role: 'Super Admin' } }) {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const [notifications, setNotifications] = useState([
        { id: 1, title: 'New user registered', time: '5m ago', unread: true },
        { id: 2, title: 'New post submitted', time: '1h ago', unread: true },
        { id: 3, title: 'Server backup successful', time: '3h ago', unread: false },
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    return (
        <Group h="100%" px="md" justify="space-between" bg="var(--mantine-color-body)" style={{ borderBottom: '1px solid #eaeaea' }}>
            {/* Left Section: Burger & App Title with Dashboard Link */}
            <Group>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                <Text
                    fw={700}
                    size="lg"
                    c="blue.7"
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/dashboard')}
                >
                    Admin Panel
                </Text>
            </Group>

            {/* Right Section: Notifications, Tooltips & User Profile */}
            <Group gap="md">
                <Tooltip label="Toggle Theme">
                    <ThemeToggle />
                </Tooltip>

                {/* Notification Dropdown Menu */}
                <Menu shadow="md" width={320} position="bottom-end" transitionProps={{ transition: 'pop-top-right' }}>
                    <Menu.Target>
                        <Tooltip label="Notifications">
                            <ActionIcon variant="subtle" size="lg" radius="xl" aria-label="Notifications" style={{ position: 'relative' }}>
                                <IconBell size={20} />
                                {unreadCount > 0 && (
                                    <div style={{ position: 'absolute', top: 4, right: 4 }}>
                                        <Badge size="xs" circle color="red">{unreadCount}</Badge>
                                    </div>
                                )}
                            </ActionIcon>
                        </Tooltip>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Group justify="between" px="xs" py="6">
                            <Text fw={600} size="sm">Notifications</Text>
                            {unreadCount > 0 && (
                                <Text
                                    size="xs"
                                    c="blue"
                                    style={{ cursor: 'pointer' }}
                                    onClick={markAllAsRead}
                                >
                                    Mark all as read
                                </Text>
                            )}
                        </Group>
                        <Menu.Divider />

                        <ScrollArea.Autosize mah={250}>
                            {notifications.length > 0 ? (
                                notifications.map((item) => (
                                    <Menu.Item key={item.id} style={{ backgroundColor: item.unread ? 'var(--mantine-color-default-hover)' : 'transparent' }}>
                                        <Group justify="between" wrap="nowrap">
                                            <div>
                                                <Text size="sm" fw={item.unread ? 600 : 400}>{item.title}</Text>
                                                <Text size="xs" c="dimmed">{item.time}</Text>
                                            </div>
                                            {item.unread && <Badge size="dot" color="blue" />}
                                        </Group>
                                    </Menu.Item>
                                ))
                            ) : (
                                <Text ta="center" c="dimmed" size="sm" py="md">No notifications</Text>
                            )}
                        </ScrollArea.Autosize>

                        <Menu.Divider />
                        <Menu.Item
                            ta="center"
                            c="blue"
                            style={{ fontWeight: 500 }}
                            onClick={() => navigate('/notifications')}
                        >
                            View all notifications
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                {/* User Profile Dropdown */}
                <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                        <Group style={{ cursor: 'pointer' }} gap="xs">
                            <Avatar src={user.avatar} radius="xl" size="sm" color="blue">
                                {user.name.charAt(0)}
                            </Avatar>
                            <Box style={{ lineHeight: 1 }} visibleFrom="sm">
                                <Text size="sm" fw={500}>{user.name}</Text>
                                <Text size="xs" c="dimmed">{user.role}</Text>
                            </Box>
                        </Group>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Settings</Menu.Label>
                        <Menu.Item
                            leftSection={<IconUser size={14} />}
                            onClick={() => navigate('/profile')}
                        >
                            Profile
                        </Menu.Item>
                        <Menu.Item
                            leftSection={<IconSettings size={14} />}
                            onClick={() => navigate('/account-settings')}
                        >
                            Account Settings
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item
                            color="red"
                            leftSection={<IconLogout size={14} />}
                            onClick={logout}
                        >
                            Logout
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Group>
    );
}