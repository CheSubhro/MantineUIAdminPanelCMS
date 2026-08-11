
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Group, Text, rem } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Modal } from '../../../components/common';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { mediaUploadSchema, MAX_FILE_SIZE } from '../../../utils/validators';

export default function MediaUploadModal({ opened, onClose, onUpload }) {
    const {
        control,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(mediaUploadSchema),
        defaultValues: {
            files: [],
        },
    });

    const handleFormSubmit = (data) => {
        if (onUpload && data.files.length > 0) {
            onUpload(data.files);
            reset();
            onClose();
        }
    };

    const errorMessage = errors.files?.message || errors.files?.root?.message;

    return (
        <Modal
            opened={opened}
            onClose={() => { reset(); onClose(); }}
            title="Upload Files to Cloudinary"
            size="lg"
            centered
        >
            {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium shadow-sm">
                    {errorMessage}
                </div>
            )}

            <Controller
                name="files"
                control={control}
                render={({ field }) => (
                    <Dropzone
                        onDrop={(files) => {
                            clearErrors('files');
                            field.onChange(files);
                            handleSubmit(handleFormSubmit)();
                        }}
                        onReject={(files) => {
                            const rejectedFile = files[0]?.file;
                            if (rejectedFile && !ALLOWED_IMAGE_TYPES.includes(rejectedFile.type)) {
                                setError('files', { type: 'manual', message: 'Invalid file type. Only JPEG, PNG, and WEBP are allowed.' });
                            } else if (rejectedFile && rejectedFile.size > MAX_FILE_SIZE) {
                                setError('files', { type: 'manual', message: 'File size exceeds the 5MB limit.' });
                            } else {
                                setError('files', { type: 'manual', message: 'File upload rejected. Check file size and type.' });
                            }
                        }}
                        maxSize={MAX_FILE_SIZE}
                        accept={IMAGE_MIME_TYPE}
                    >
                        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                            <Dropzone.Accept>
                                <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} stroke={1.5} />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
                            </Dropzone.Idle>

                            <div>
                                <Text size="xl" inline>Drag images here or click to select files</Text>
                                <Text size="sm" c="dimmed" inline mt={7}>Attach as many files as you like, each file should not exceed 5mb</Text>
                            </div>
                        </Group>
                    </Dropzone>
                )}
            />
        </Modal>
    );
}