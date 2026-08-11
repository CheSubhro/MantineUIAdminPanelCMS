
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import AccountSettingsPage from '../pages/AccountSettingsPage';
import NotificationsPage from '../pages/NotificationsPage';
import DashboardPage from '../pages/DashboardPage';
import UsersPage from '../pages/UsersPage';
import CategoriesPage from '../pages/CategoriesPage';
import PostsPage from '../pages/PostsPage';
import PagesPage from '../pages/PagesPage';
import SeoPage from '../pages/SeoPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import ReportsPage from '../pages/ReportsPage';
import SettingsPage from '../pages/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';

import MediaManagerPage from '../pages/MediaManagerPage';
import CommentsPage from '../pages/CommentsPage';

import { useAuth } from '../hooks/useAuth';
import { PERMISSIONS } from '../utils/permissions';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="account-settings" element={<AccountSettingsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/pages" element={<PagesPage />} />
            <Route path="/seo" element={<SeoPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
        
            <Route path="/media" element={<MediaManagerPage />} />
            <Route path="/comments" element={<CommentsPage />} />

            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}