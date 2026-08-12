
import React from 'react';
import { Card, Input, CustomSelect } from '../../../components/common';
import { Controller } from 'react-hook-form';

export function GeneralSettings({ register, control, errors }) {

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
                        {...register('siteName')}
                        placeholder="Enter site name"
                    />
                    {errors?.siteName && (
                        <p className="text-red-500 text-xs mt-1">{errors.siteName.message}</p>
                    )}
                </div>
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Tagline</label>
                    <Input
                        type="text"
                        {...register('tagline')}
                        placeholder="Enter tagline"
                    />
                </div>
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Timezone</label>
                    <Controller
                        name="timezone"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                options={timezoneOptions}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Default Language</label>
                    <Controller
                        name="language"
                        control={control}
                        render={({ field }) => (
                            <CustomSelect
                                options={languageOptions}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>
            </div>
        </Card>
    );
}