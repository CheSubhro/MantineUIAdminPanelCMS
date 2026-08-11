
import React from 'react';
import { Card, Text, Title } from '@mantine/core';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#228be6', '#40c057', '#fab005', '#fd7e14'];

export default function CategoriesChartCard({ categoriesData }) {
    
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ backgroundColor: '#1a1b1e', borderColor: '#2c2e33', color: '#c1c2c5' }}>
            <Title order={3} className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                Top Categories
            </Title>
            <Text size="xs" c="dimmed" className="mb-4">
                Distribution of posts by category
            </Text>

            <div style={{ width: '100%', height: 240 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={categoriesData}
                            cx="50%"
                            cy="70%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={4}
                            dataKey="value"
                        >
                            {categoriesData.map((entry, index) => (
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