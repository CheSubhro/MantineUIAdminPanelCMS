
import React from 'react';
import { Card, Input } from '../../../components/common';

export function SmtpSettings({ register }) {

    return (
        <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Email / SMTP Configuration
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                        SMTP Host
                    </label>

                    <Input
                        type="text"
                        {...register('smtpHost')}
                        placeholder="smtp.example.com"
                    />
                </div>

                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                        SMTP Port
                    </label>

                    <Input
                        type="text"
                        {...register('smtpPort')}
                        placeholder="587"
                    />
                </div>

                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                        SMTP Username
                    </label>

                    <Input
                        type="text"
                        {...register('smtpUser')}
                        placeholder="Username"
                    />
                </div>

                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                        SMTP Password
                    </label>

                    <div className="relative">
                        <Input
                            type="password"
                            {...register('smtpPass')}
                            placeholder="••••••••"
                            className="pr-12"
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}