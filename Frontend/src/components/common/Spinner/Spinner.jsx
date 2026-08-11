
import { Loader, Center } from '@mantine/core';

export default function Spinner({ size = 'sm', color, centered = false }) {
    const loader = <Loader size={size} color={color} />;
    return centered ? <Center py="xl">{loader}</Center> : loader;
}