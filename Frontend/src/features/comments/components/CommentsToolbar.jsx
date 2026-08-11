
import { Group, TextInput, Select } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export default function CommentsToolbar({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }) {
    return (
        <Group justify="space-between">
            <TextInput
                placeholder="Search comments by author or content..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '350px' }}
            />

            <Select
                value={statusFilter}
                onChange={(val) => setStatusFilter(val || 'all')}
                data={[
                    { value: 'all', label: 'All Status' },
                    { value: 'approved', label: 'Approved' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'spam', label: 'Spam' },
                ]}
                style={{ width: '200px' }}
            />
        </Group>
    );
}