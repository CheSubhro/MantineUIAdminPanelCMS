
import { z } from 'zod';

// --- 1. User Form Validation ---
export const userFormSchema = z.object({
    name: z.string().min(1, 'Name is required.').min(2, 'Name must be at least 2 characters long.'),
    email: z.string().min(1, 'Email is required.').email('Invalid email address format.'),
    role: z.string().min(1, 'Role is required.'),
});

// --- 2. Category Form Validation ---
export const categoryFormSchema = z.object({
    name: z.string().min(1, 'Category name is required').min(2, 'Category name must be at least 2 characters long'),
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase and contain only letters, numbers, and hyphens'),
    description: z.string().max(255, 'Description cannot exceed 255 characters').optional().or(z.literal('')),
});

// --- 3. Post Form Validation ---
export const postFormSchema = z.object({
    title: z.string().min(1, 'Post title is required').min(3, 'Post title must be at least 3 characters long'),
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase and contain only letters, numbers, and hyphens'),
    author: z.string().min(1, 'Author name is required'),
    excerpt: z.string().max(300, 'Excerpt cannot exceed 300 characters').optional().or(z.literal('')),
});

// --- 4. Page Form Validation ---
export const pageFormSchema = z.object({
    title: z.string().min(1, 'Page title is required').min(3, 'Page title must be at least 3 characters long'),
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase and contain only letters, numbers, and hyphens'),
    author: z.string().min(1, 'Author name is required'),
    excerpt: z.string().max(300, 'Excerpt cannot exceed 300 characters').optional().or(z.literal('')),
});

// --- 5. Comment Reply Form Validation ---
export const commentReplySchema = z.object({
    replyText: z.string().min(1, 'Reply text is required').min(2, 'Reply must be at least 2 characters long'),
});

// --- 6. Time Range Validation ---
export function validateTimeRange(timeRange) {
    const validRanges = ['7days', '30days', '3months', 'year'];
    return validRanges.includes(timeRange) ? timeRange : '7days';
}

// --- Settings Form Validation ---
export const settingsFormSchema = z.object({
    siteName: z.string().min(1, 'Site name is required').min(2, 'Site name must be at least 2 characters long'),
    tagline: z.string().min(1, 'Tagline is required').min(3, 'Tagline must be at least 3 characters long'),
    timezone: z.string().min(1, 'Timezone is required'),
    language: z.string().min(1, 'Default language is required'),
    passwordExpireDays: z.coerce.number()
        .min(1, 'Password expiration days is required')
        .int()
        .min(1, 'Password expiration must be between 1 and 3650 days')
        .max(3650, 'Password expiration must be between 1 and 3650 days'),
    sessionTimeout: z.coerce.number()
        .min(1, 'Session timeout is required')
        .int()
        .min(1, 'Session timeout must be between 1 and 1440 minutes')
        .max(1440, 'Session timeout must be between 1 and 1440 minutes'),
    smtpHost: z.string().min(1, 'SMTP host is required').min(3, 'SMTP host must be at least 3 characters long'),
    smtpPort: z.coerce.number()
        .min(1, 'SMTP port is required')
        .int()
        .min(1, 'SMTP port must be between 1 and 65535')
        .max(65535, 'SMTP port must be between 1 and 65535'),
    smtpUser: z.string().min(1, 'SMTP username is required'),
    smtpPass: z.string().min(1, 'SMTP password is required').min(4, 'SMTP password must be at least 4 characters long'),
    googleAnalyticsId: z.string().trim().min(1, 'Google Analytics ID cannot contain only spaces').optional().or(z.literal('')),
    paymentGatewayKey: z.string().trim().min(1, 'Payment gateway API key cannot contain only spaces').optional().or(z.literal('')),
    externalApiKey: z.string().trim().min(1, 'External API key cannot contain only spaces').optional().or(z.literal('')),
    backupFrequency: z.enum(['daily', 'weekly', 'monthly'], {
        errorMap: () => ({ message: 'Please select a valid backup frequency' }),
    }),
});

// --- Register Form Validation ---
export const registerFormSchema = z.object({
    fullName: z.string().min(1, 'Full name is required').min(2, 'Full name must be at least 2 characters long'),
    username: z.string().min(1, 'Username is required')
        .min(3, 'Username must be at least 3 characters long')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    email: z.string().min(1, 'Email is required').email('Invalid email address format'),
    password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters long'),
    role: z.string().min(1, 'Role is required'),
});

// --- Login Form Validation ---
export const loginFormSchema = z.object({
    identifier: z.string().min(1, 'Username or email is required'),
    password: z.string().min(1, 'Password is required'),
});

// --- Email Validation Helper ---
export const isValidEmail = (email) => {
    const result = z.string().email().safeParse(email);
    return result.success;
};

// --- Media File Validation ---
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Standalone function for single file checks
export function validateMediaFile(file) {
    if (!file) {
        return { isValid: false, message: 'No file provided.' };
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return { isValid: false, message: 'Invalid file type. Only JPEG, PNG, and WEBP are allowed.' };
    }
    if (file.size > MAX_FILE_SIZE) {
        return { isValid: false, message: 'File size exceeds the 5MB limit.' };
    }
    return { isValid: true, message: 'File is valid.' };
}

// Zod Schema for React Hook Form integration
export const mediaUploadSchema = z.object({
    files: z.array(z.any())
        .min(1, 'No file provided.')
        .refine((files) => files.every((f) => ALLOWED_IMAGE_TYPES.includes(f.type)), 'Invalid file type. Only JPEG, PNG, and WEBP are allowed.')
        .refine((files) => files.every((f) => f.size <= MAX_FILE_SIZE), 'File size exceeds the 5MB limit.'),
});

// --- SEO Form Validation ---
export const seoFormSchema = z.object({
    metaTitle: z.string().max(60, 'Meta title cannot exceed 60 characters').optional().or(z.literal('')),
    metaDescription: z.string().max(160, 'Meta description cannot exceed 160 characters').optional().or(z.literal('')),
    focusKeyword: z.string().optional().or(z.literal('')),
    targetPlatform: z.string().optional().or(z.literal('')),
    ogTitle: z.string().optional().or(z.literal('')),
    ogDescription: z.string().optional().or(z.literal('')),
    ogImage: z.string().url('Invalid image URL format').optional().or(z.literal('')),
});

export const formatZodErrors = (schema, values) => {
    const result = schema.safeParse(values);
    if (result.success) return {};

    const errors = {};
    result.error.issues.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path && !errors[path]) {
            errors[path] = issue.message;
        }
    });
    return errors;
};