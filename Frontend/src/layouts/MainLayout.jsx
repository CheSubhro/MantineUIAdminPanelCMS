
import React from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar, Sidebar, Footer } from '../components/layout/index';

const MainLayout = ({ children }) => {

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 50 }}
            navbar={{
                width: 260,
                breakpoint: 'sm',
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            {/* Header / Navbar */}
            <AppShell.Header>
                <Navbar opened={mobileOpened} toggle={toggleMobile} />
            </AppShell.Header>

            {/* Sidebar */}
            <AppShell.Navbar>
                <Sidebar />
            </AppShell.Navbar>

            {/* Main Content Area */}
            <AppShell.Main style={{ backgroundColor: 'var(--mantine-color-body)', color: 'var(--mantine-color-text)', minHeight: '100vh' }}>
                {children}
            </AppShell.Main>

            {/* Footer */}
            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
};

export default MainLayout;