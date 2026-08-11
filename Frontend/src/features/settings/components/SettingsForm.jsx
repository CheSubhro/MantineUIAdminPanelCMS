
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../components/common';
import { GeneralSettings } from './GeneralSettings';
import { NotificationSettings } from './NotificationSettings';
import { SecuritySettings } from './SecuritySettings';
import { SmtpSettings } from './SmtpSettings';
import { ApiIntegrations } from './ApiIntegrations';
import { BackupMaintenance } from './BackupMaintenance';
import { settingsFormSchema } from '../../../utils/validators';

export function SettingsForm({ settings, onSave, loading, successMessage }) {

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(settingsFormSchema),
        defaultValues: settings || {},
    });

    const handleFormSubmit = (data) => {
        if (onSave) {
            onSave(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="max-w-3xl mx-auto">
            {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium shadow-sm">
                    {successMessage}
                </div>
            )}

            <GeneralSettings register={register} control={control} errors={errors} />
            <NotificationSettings register={register} control={control} errors={errors} />
            <SecuritySettings register={register} control={control} errors={errors} />
            <SmtpSettings register={register} control={control} errors={errors} />
            <ApiIntegrations register={register} control={control} errors={errors} />
            <BackupMaintenance register={register} control={control} errors={errors} />

            {/* Global Save Button */}
            <div className="flex justify-end pb-10">
                <Button
                    color="violet"
                    variant="filled"
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 text-base"
                >
                    {loading ? 'Saving Changes...' : 'Save All Changes'}
                </Button>
            </div>
        </form>
    );
}