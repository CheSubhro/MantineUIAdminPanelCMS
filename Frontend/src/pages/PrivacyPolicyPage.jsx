
import { Container, Title, Text, Stack, Card } from '@mantine/core';

export default function PrivacyPolicyPage() {
    
    return (
        <Container size="md" py="xl">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap="md">
                    <Title order={2} c="blue.7">Privacy Policy</Title>
                    <Text size="sm" c="dimmed">Last updated: July 31, 2026</Text>

                    <Text size="sm">
                        Welcome to our Admin Panel CMS. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our dashboard and tell you about your privacy rights and how the law protects you.
                    </Text>

                    <Title order={4} mt="sm">1. Data We Collect</Title>
                    <Text size="sm">
                        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows: Identity Data (username, first name, last name), Contact Data (email address), and Technical Data (login data, browser type and version, time zone setting, and operating system).
                    </Text>

                    <Title order={4} mt="sm">2. How We Use Your Data</Title>
                    <Text size="sm">
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </Text>
                    <Text size="sm" pl="md">
                        • To register you as a new user or admin.<br />
                        • To manage our relationship with you (notifying you about changes to our terms or privacy policy).<br />
                        • To administer and protect our business and this admin panel (including troubleshooting, data analysis, and system testing).
                    </Text>

                    <Title order={4} mt="sm">3. Data Security</Title>
                    <Text size="sm">
                        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
                    </Text>

                    <Title order={4} mt="sm">4. Contact Us</Title>
                    <Text size="sm">
                        If you have any questions about this privacy policy or our privacy practices, please contact our system administrator.
                    </Text>
                </Stack>
            </Card>
        </Container>
    );
}