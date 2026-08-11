
import React from 'react';
import { Card, Input } from '../../../components/common';

export function SmtpSettings({ settings, updateSetting }) {

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
                        value={settings.smtpHost}
                        onChange={(e) =>
                            updateSetting('smtpHost', e.target.value)
                        }
                        placeholder="smtp.example.com"
                    />
                </div>

                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                        SMTP Port
                    </label>

                    <Input
                        type="text"
                        value={settings.smtpPort}
                        onChange={(e) =>
                            updateSetting('smtpPort', e.target.value)
                        }
                        placeholder="587"
                    />
                </div>

                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">
                        SMTP Username
                    </label>

                    <Input
                        type="text"
                        value={settings.smtpUser}
                        onChange={(e) =>
                            updateSetting('smtpUser', e.target.value)
                        }
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
                            value={settings.smtpPass}
                            onChange={(e) =>
                                updateSetting('smtpPass', e.target.value)
                            }
                            placeholder="••••••••"
                            className="pr-12"
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}