
import React from 'react';
import { Card, Text, Title } from '@mantine/core';
import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts";

const defaultTrafficData = [
    { source: "Search", percentage: 50 },
    { source: "Direct", percentage: 30 },
    { source: "Social", percentage: 20 }
];

const COLORS = ['#228be6', '#40c057', '#fab005', '#fd7e14'];

export default function TrafficSourcesCard({ trafficSources }) {

    const data = trafficSources?.length > 0 ? trafficSources : defaultTrafficData;

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: '#1a1b1e', borderColor: '#2c2e33', color: '#c1c2c5', height: '100%' }}>
            <Title order={3} className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                Traffic Sources
            </Title>
            <Text size="xs" c="dimmed" className="mb-4">
                Visitor distribution by channels
            </Text>

            {/* Recharts Pie Chart Section */}
            <div style={{ width: '100%', height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="percentage"
                            nameKey="source"
                            cx="50%"
                            cy="50%"
                            outerRadius={75}
                            innerRadius={45}
                            paddingAngle={4}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#141517', borderColor: '#2c2e33', borderRadius: '8px', color: '#fff' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}