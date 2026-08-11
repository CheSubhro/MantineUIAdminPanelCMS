
import React from 'react';
import { Card } from '../../../components/common';

export function NotificationSettings({ settings, updateSetting }) {

    return (
        <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Notification Settings</h2>
            <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={settings.systemEmailAlerts}
                        onChange={(e) => updateSetting('systemEmailAlerts', e.target.checked)}
                        className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                    />
                    <span className="text-sm font-medium text-gray-700">System Email Alerts</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={(e) => updateSetting('pushNotifications', e.target.checked)}
                        className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Push Notifications</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={settings.smsAlerts}
                        onChange={(e) => updateSetting('smsAlerts', e.target.checked)}
                        className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                    />
                    <span className="text-sm font-medium text-gray-700">SMS Alerts</span>
                </label>
            </div>
        </Card>
    );
}