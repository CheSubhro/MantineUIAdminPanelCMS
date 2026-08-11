
import { Group } from '@mantine/core';
import { Input, Button } from '../../../components/common';
import { IconSearch, IconUpload } from '@tabler/icons-react';

export default function MediaToolbar({ searchQuery, setSearchQuery, onOpenUpload }) {
    return (
        <Group mb="md" justify="space-between">
            <Input
                placeholder="Search media by name..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ flex: 1 }}
            />
            <Button
                leftSection={<IconUpload size={16} />}
                color="violet"
                onClick={onOpenUpload}
            >
                Upload New Asset
            </Button>
        </Group>
    );
}