
import React from 'react';
import { Card, Input, CustomSelect } from '../../../components/common';

export function GeneralSettings({ settings, updateSetting }) {

    const timezoneOptions = [
        { label: 'UTC (Coordinated Universal Time)', value: 'UTC (Coordinated Universal Time)' },
        { label: 'Asia/Dhaka (GMT+6)', value: 'Asia/Dhaka' },
        { label: 'Asia/Kolkata (GMT+5:30)', value: 'Asia/Kolkata' },
        { label: 'America/New_York (EST)', value: 'America/New_York' },
    ];

    const languageOptions = [
        { label: 'English', value: 'en' },
        { label: 'Bengali (বাংলা)', value: 'bn' },
        { label: 'Spanish', value: 'es' },
    ];

    return (
        <Card className="p-6 mb-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">General Settings</h2>
            <div className="space-y-4">
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Site Name</label>
                    <Input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) => updateSetting('siteName', e.target.value)}
                        placeholder="Enter site name"
                    />
                </div>
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Tagline</label>
                    <Input
                        type="text"
                        value={settings.tagline}
                        onChange={(e) => updateSetting('tagline', e.target.value)}
                        placeholder="Enter tagline"
                    />
                </div>
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Timezone</label>
                    <CustomSelect
                        options={timezoneOptions}
                        value={settings.timezone}
                        onChange={(value) => updateSetting('timezone', value)}
                    />
                </div>
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Default Language</label>
                    <CustomSelect
                        options={languageOptions}
                        value={settings.language}
                        onChange={(value) => updateSetting('language', value)}
                    />
                </div>
            </div>
        </Card>
    );
}