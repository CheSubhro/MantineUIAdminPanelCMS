
import React from 'react';
import { Container, Title, Text, Button, Paper } from '@mantine/core';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container size="sm" py="xl">
                    <Paper p="xl" radius="md" withBorder ta="center">
                        <Title order={2} c="red" mb="sm">Something went wrong.</Title>
                        <Text c="dimmed" mb="lg">
                            {this.state.error?.message || "An unexpected error occurred."}
                        </Text>
                        <Button onClick={() => window.location.reload()}>Reload Page</Button>
                    </Paper>
                </Container>
            );
        }
        return this.props.children;
    }
}