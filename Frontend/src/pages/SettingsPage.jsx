
import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { SettingsForm } from '../features/settings/components/SettingsForm';
import { Spinner } from '../components/common';

export default function SettingsPage() {

    const { settings, saveSettings, loading, successMessage } = useSettings();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h1>
            {loading && !settings ? (
                <div className="flex justify-center p-12">
                    <Spinner size="lg" />
                </div>
            ) : (
                <SettingsForm
                    settings={settings}
                    onSave={saveSettings}
                    loading={loading}
                    successMessage={successMessage}
                />
            )}
        </div>
    );
}