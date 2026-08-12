
import React from 'react';
import { Card, CustomSelect } from '../../../components/common';
import { Controller } from 'react-hook-form';

export function BackupMaintenance({ control, register }) {

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
                    <Controller
                        name="backupFrequency"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                options={backupOptions}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
                <div className="pt-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            {...register('maintenanceMode')}
                            className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Enable Maintenance Mode</span>
                    </label>
                </div>
            </div>
        </Card>
    );
}