
import React from 'react';
import { Card, Text, Title } from '@mantine/core';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid
} from 'recharts';

const data = [
    { day: 'Mon', views: 4000 },
    { day: 'Tue', views: 3000 },
    { day: 'Wed', views: 5000 },
    { day: 'Thu', views: 2780 },
    { day: 'Fri', views: 1890 },
    { day: 'Sat', views: 2390 },
    { day: 'Sun', views: 3490 },
];

export default function TrafficChartCard() {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: '#1a1b1e', borderColor: '#2c2e33', color: '#c1c2c5', height: '100%' }}>
            <Title order={3} className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                Traffic Overview
            </Title>
            <Text size="xs" c="dimmed" className="mb-4">
                Visitor trends over the last 7 days
            </Text>

            <div style={{ width: '100%', height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#228be6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#228be6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2c2e33" />
                        <XAxis dataKey="day" stroke="#909296" fontSize={12} tick={{ fill: '#909296' }} />
                        <YAxis stroke="#909296" fontSize={12} tick={{ fill: '#909296' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#141517', borderColor: '#2c2e33', borderRadius: '8px', color: '#fff' }} />
                        <Area type="monotone" dataKey="views" stroke="#228be6" fillOpacity={1} fill="url(#colorViews)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}