
import { useState, useEffect, useCallback } from 'react';
import { showToast } from '../utils/toast';
import api from '../services/api';

export function useSettings() {
    
    const [settings, setSettings] = useState({
        siteName: 'My Application',
        tagline: 'Building amazing apps with React & Vite',
        timezone: 'UTC (Coordinated Universal Time)',
        language: 'en',
        systemEmailAlerts: true,
        pushNotifications: true,
        smsAlerts: false,
        twoFactorAuth: true,
        passwordExpireDays: '90',
        sessionTimeout: '30',
        smtpHost: 'smtp.mailtrap.io',
        smtpPort: '587',
        smtpUser: '',
        smtpPass: '',
        googleAnalyticsId: 'UA-XXXXXXXXX-X',
        paymentGatewayKey: '',
        externalApiKey: '',
        backupFrequency: 'daily',
        maintenanceMode: false,
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch settings from backend API
    const fetchSettings = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/settings');
            const data = response.data.data || response.data;
            if (data) {
                setSettings((prev) => ({
                    ...prev,
                    ...data,
                }));
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch system settings.';
            showToast.error('Fetch Failed', errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    // Save settings via PUT API
    const saveSettings = useCallback(async (formData, onSuccess) => {
        setLoading(true);
        setSuccessMessage('');
        
        try {
            const response = await api.put('/settings', formData);
            const updatedData = response.data.data || response.data;
            
            if (updatedData) {
                setSettings((prev) => ({
                    ...prev,
                    ...updatedData,
                }));
            }

            setSuccessMessage('Settings updated successfully!');
            showToast.success('Settings Saved', 'System configurations updated successfully.');
            
            if (onSuccess) onSuccess();

            setTimeout(() => setSuccessMessage(''), 3000);
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update system settings.';
            showToast.error('Update Failed', errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        settings,
        saveSettings,
        loading,
        successMessage,
        refetchSettings: fetchSettings,
    };
}