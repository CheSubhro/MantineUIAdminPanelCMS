
import React from 'react';
import { Card, Input } from '../../../components/common';

export function ApiIntegrations({ register }) {

    return (
        <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">API & Integrations</h2>
            <div className="space-y-4">
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Google Analytics Tracking ID</label>
                    <Input
                        type="text"
                        {...register('googleAnalyticsId')}
                        placeholder="UA-XXXXXXXXX-X"
                    />
                </div>
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">Payment Gateway API Key</label>
                    <Input
                        type="text"
                        {...register('paymentGatewayKey')}
                        placeholder="pk_test_..."
                    />
                </div>
                <div>
                    <label className="block mb-1.5 text-sm font-semibold text-gray-700">External API Key</label>
                    <Input
                        type="text"
                        {...register('externalApiKey')}
                        placeholder="API Key"
                    />
                </div>
            </div>
        </Card>
    );
}