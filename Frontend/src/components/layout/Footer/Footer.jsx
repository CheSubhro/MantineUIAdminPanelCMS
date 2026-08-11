
import { Group, Text, Anchor } from '@mantine/core';
import { Badge } from '../../common/index';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
    
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    return (
        <Group h="100%" px="md" justify="space-between" bg="var(--mantine-color-body)" style={{ borderTop: '1px solid #eaeaea' }}>
            <Text size="sm" c="dimmed">
                © {currentYear} <Anchor href="#" size="sm" fw={500}>Admin Panel Inc</Anchor>. All rights reserved.
            </Text>

            <Group gap="xs">
                <Badge variant="light" color="green" size="sm">System v1.0.0</Badge>
                <Anchor onClick={() => navigate('/privacy-policy')} size="xs" c="dimmed" style={{ cursor: 'pointer' }}>Privacy Policy</Anchor>
                <Text size="xs" c="dimmed">•</Text>
                <Anchor onClick={() => navigate('/terms-of-service')} size="xs" c="dimmed" style={{ cursor: 'pointer' }}>Terms of Service</Anchor>
            </Group>
        </Group>
    );
}