
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from './components/common';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <MainLayout>
                    <AppRoutes />
                </MainLayout>
            </ErrorBoundary>
        </Router>
    );
}

export default App;