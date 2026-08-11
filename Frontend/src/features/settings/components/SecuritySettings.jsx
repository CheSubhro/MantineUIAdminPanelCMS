
import React from 'react';
import { Card, Input } from '../../../components/common';

export function SecuritySettings({ settings, updateSetting }) {

    return (
        <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Security & Access Control</h2>
            <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer pb-2">
                    <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => updateSetting('twoFactorAuth', e.target.checked)}
                        className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Enforce Two-Factor Authentication (2FA)</span>
                </label>
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Password Expiration (Days)</label>
                    <Input
                        type="number"
                        value={settings.passwordExpireDays}
                        onChange={(e) => updateSetting('passwordExpireDays', e.target.value)}
                        placeholder="e.g. 90"
                    />
                </div>
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Session Timeout (Minutes)</label>
                    <Input
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
                        placeholder="e.g. 30"
                    />
                </div>
            </div>
        </Card>
    );
}