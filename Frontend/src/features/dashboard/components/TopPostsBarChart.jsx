
import React from 'react';
import { Card, Text, Title } from '@mantine/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function TopPostsBarChart({ topPosts }) {
    
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: '#1a1b1e', borderColor: '#2c2e33', color: '#c1c2c5', height: '100%' }}>
            <Title order={3} className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                Top Posts Performance
            </Title>
            <Text size="xs" c="dimmed" className="mb-4">
                Most viewed articles based on user engagement
            </Text>

            <div style={{ width: '100%', height: 240 }}>
                <ResponsiveContainer>
                    <BarChart data={topPosts} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2c2e33" />
                        <XAxis type="number" stroke="#909296" tick={{ fill: '#909296', fontSize: 12 }} />
                        <YAxis dataKey="title" type="category" stroke="#909296" width={90} tick={{ fill: '#909296', fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#141517', borderColor: '#2c2e33', borderRadius: '8px', color: '#fff' }} />
                        <Bar dataKey="views" fill="#228be6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}