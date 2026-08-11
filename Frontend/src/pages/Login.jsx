
import React from 'react';
import { Paper, Title, Container, Text } from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../features/auth/components/LoginForm';

export default function Login() {
    
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleLoginSubmit = (identifier, password) => {
        const success = login(identifier, password);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <Container size={420} my={40}>
            <Title align="center" fw={900}>Welcome Back!</Title>
            <Text c="dimmed" size="sm" align="center" mt={5}>
                Don't have an account yet? <Link to="/register">Register</Link>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <LoginForm onSubmit={handleLoginSubmit} error={error} />
            </Paper>
        </Container>
    );
}