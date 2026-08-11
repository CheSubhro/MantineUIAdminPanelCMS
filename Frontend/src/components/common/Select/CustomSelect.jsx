
import { Select } from '@mantine/core';

export default function CustomSelect({ options, data, ...props }) {
    const selectData = data || options || [];
    return <Select clearable searchable data={selectData} {...props} />;
}