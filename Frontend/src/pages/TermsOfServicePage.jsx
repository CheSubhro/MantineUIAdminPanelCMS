
import { Container, Title, Text, Stack, Card } from '@mantine/core';

export default function TermsOfServicePage() {
    
    return (
        <Container size="md" py="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap="md">
                    <Title order={2} c="blue.7">Terms of Service</Title>
                    <Text size="sm" c="dimmed">Last updated: July 31, 2026</Text>

                    <Text size="sm">
                        Welcome to our Admin Panel CMS. By accessing or using this dashboard, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                    </Text>

                    <Title order={4} mt="sm">1. Accounts and Security</Title>
                    <Text size="sm">
                        When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service. You are responsible for safeguarding the password that you use to access the panel.
                    </Text>

                    <Title order={4} mt="sm">2. Intellectual Property</Title>
                    <Text size="sm">
                        The CMS service and its original content, features, and functionality are and will remain the exclusive property of Admin Panel Inc. and its licensors. The service is protected by copyright, trademark, and other laws.
                    </Text>

                    <Title order={4} mt="sm">3. Termination</Title>
                    <Text size="sm">
                        हम (We) may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.
                    </Text>

                    <Title order={4} mt="sm">4. Limitation of Liability</Title>
                    <Text size="sm">
                        In no event shall Admin Panel Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of the admin panel.
                    </Text>

                    <Title order={4} mt="sm">5. Changes to Terms</Title>
                    <Text size="sm">
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
                    </Text>
                </Stack>
            </Card>
        </Container>
    );
}