
import { Container, Title, Text, Button, Stack } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    
    const navigate = useNavigate();

    return (
        <Container py={80} ta="center">
            <Stack align="center" gap="md">
                <Title order={1} c="red" style={{ fontSize: '3rem' }}>
                    404
                </Title>
                <Title order={2}>Page Not Found</Title>
                <Text c="dimmed" maw={400} mx="auto">
                    The page you are trying to access does not exist or has been moved.
                    Please check the URL or head back to the dashboard.
                </Text>
                <Button
                    leftSection={<IconArrowLeft size={16} />}
                    variant="filled"
                    mt="md"
                    onClick={() => navigate('/dashboard')}
                >
                    Back to Dashboard
                </Button>
            </Stack>
        </Container>
    );
}