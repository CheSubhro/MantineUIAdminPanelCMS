
import { useState, useCallback } from 'react';
import { showToast } from '../utils/toast';

export function useSettings(initialSettings = {}) {
    
    const [settings, setSettings] = useState({
        // General
        siteName: initialSettings.siteName || 'My Application',
        tagline: initialSettings.tagline || 'Building amazing apps with React & Vite',
        timezone: initialSettings.timezone || 'UTC (Coordinated Universal Time)',
        language: initialSettings.language || 'en',
        
        // Notifications
        systemEmailAlerts: initialSettings.systemEmailAlerts ?? true,
        pushNotifications: initialSettings.pushNotifications ?? true,
        smsAlerts: initialSettings.smsAlerts ?? false,

        // Security & Access Control
        twoFactorAuth: initialSettings.twoFactorAuth ?? true,
        passwordExpireDays: initialSettings.passwordExpireDays || '90',
        sessionTimeout: initialSettings.sessionTimeout || '30',

        // Email / SMTP
        smtpHost: initialSettings.smtpHost || 'smtp.mailtrap.io',
        smtpPort: initialSettings.smtpPort || '587',
        smtpUser: initialSettings.smtpUser || '',
        smtpPass: initialSettings.smtpPass || '',

        // API & Integrations
        googleAnalyticsId: initialSettings.googleAnalyticsId || 'UA-XXXXXXXXX-X',
        paymentGatewayKey: initialSettings.paymentGatewayKey || '',
        externalApiKey: initialSettings.externalApiKey || '',

        // Backup & Maintenance
        backupFrequency: initialSettings.backupFrequency || 'daily',
        maintenanceMode: initialSettings.maintenanceMode ?? false,

        ...initialSettings,
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const updateSetting = useCallback((key, value) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    }, []);

    const saveSettings = useCallback((onSuccess) => {
        setLoading(true);
        setSuccessMessage('');
        
        setTimeout(() => {
            setLoading(false);
            setSuccessMessage('Settings updated successfully!');
            showToast.success('Settings Saved', 'System configurations updated successfully.');
            if (onSuccess) onSuccess();
            
            setTimeout(() => setSuccessMessage(''), 3000);
        }, 500);
    }, []);

    return {
        settings,
        updateSetting,
        saveSettings,
        loading,
        successMessage,
    };
}