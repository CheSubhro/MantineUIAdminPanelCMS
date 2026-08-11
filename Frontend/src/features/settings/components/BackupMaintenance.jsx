
import React from 'react';
import { Card, CustomSelect } from '../../../components/common';

export function BackupMaintenance({ settings, updateSetting }) {
    
    const backupOptions = [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Monthly', value: 'monthly' },
    ];

    return (
        <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Backup & Maintenance</h2>
            <div className="space-y-4">
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Automated Backup Frequency</label>
                    <CustomSelect
                        options={backupOptions}
                        value={settings.backupFrequency}
                        onChange={(value) => updateSetting('backupFrequency', value)}
                    />
                </div>
                <div className="pt-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={settings.maintenanceMode}
                            onChange={(e) => updateSetting('maintenanceMode', e.target.checked)}
                            className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Enable Maintenance Mode</span>
                    </label>
                </div>
            </div>
        </Card>
    );
}