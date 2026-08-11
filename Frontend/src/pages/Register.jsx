
import React from 'react';
import { Paper, Title, Container, Text } from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../features/auth/components/RegisterForm';

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegisterSubmit = (formData) => {
        const success = register(formData);
        if (success) {
            navigate('/login');
        }
    };

    return (
        <Container size={420} my={40}>
            <Title align="center" fw={900}>Create Admin Account</Title>
            <Text c="dimmed" size="sm" align="center" mt={5}>
                Already have an account? <Link to="/login">Login</Link>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <RegisterForm onSubmit={handleRegisterSubmit} />
            </Paper>
        </Container>
    );
}