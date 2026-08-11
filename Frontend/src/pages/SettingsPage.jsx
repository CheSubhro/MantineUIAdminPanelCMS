
import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { SettingsForm } from '../features/settings/components/SettingsForm';

export default function SettingsPage() {
    
    const { settings, updateSetting, saveSettings, loading, successMessage } = useSettings();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h1>
            <SettingsForm
                settings={settings}
                updateSetting={updateSetting}
                onSave={saveSettings}
                loading={loading}
                successMessage={successMessage}
            />
        </div>
    );
}