
export function validateUserForm(values) {
    
    const errors = {};

    // Name Validation
    if (!values.name || !values.name.trim()) {
        errors.name = 'Name is required.';
    } else if (values.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters long.';
    }

    // Email Validation
    if (!values.email || !values.email.trim()) {
        errors.email = 'Email is required.';
    } else {
        // Standard email regex pattern
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email.trim())) {
            errors.email = 'Invalid email address format.';
        }
    }

    // Role Validation
    if (!values.role || !values.role.trim()) {
        errors.role = 'Role is required.';
    }

    return errors;
}

export function isFormValid(errors) {
    return Object.keys(errors).length === 0;
}

export const validateCategoryForm = (values) => {
    const errors = {};

    if (!values.name || values.name.trim() === '') {
        errors.name = 'Category name is required';
    } else if (values.name.length < 2) {
        errors.name = 'Category name must be at least 2 characters long';
    }

    if (!values.slug || values.slug.trim() === '') {
        errors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(values.slug)) {
        errors.slug = 'Slug must be lowercase and contain only letters, numbers, and hyphens';
    }

    if (values.description && values.description.length > 255) {
        errors.description = 'Description cannot exceed 255 characters';
    }

    return errors;
};

export const validatePostForm = (values) => {
    const errors = {};

    if (!values.title || values.title.trim() === '') {
        errors.title = 'Post title is required';
    } else if (values.title.length < 3) {
        errors.title = 'Post title must be at least 3 characters long';
    }

    if (!values.slug || values.slug.trim() === '') {
        errors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(values.slug)) {
        errors.slug = 'Slug must be lowercase and contain only letters, numbers, and hyphens';
    }

    if (!values.author || values.author.trim() === '') {
        errors.author = 'Author name is required';
    }

    if (values.excerpt && values.excerpt.length > 300) {
        errors.excerpt = 'Excerpt cannot exceed 300 characters';
    }

    return errors;
};

export const validatePageForm = (values) => {
    const errors = {};

    if (!values.title || values.title.trim() === '') {
        errors.title = 'Page title is required';
    } else if (values.title.length < 3) {
        errors.title = 'Page title must be at least 3 characters long';
    }

    if (!values.slug || values.slug.trim() === '') {
        errors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(values.slug)) {
        errors.slug = 'Slug must be lowercase and contain only letters, numbers, and hyphens';
    }

    if (!values.author || values.author.trim() === '') {
        errors.author = 'Author name is required';
    }

    if (values.excerpt && values.excerpt.length > 300) {
        errors.excerpt = 'Excerpt cannot exceed 300 characters';
    }

    return errors;
};

export function validateTimeRange(timeRange) {
    const validRanges = ['7days', '30days', '1year'];
    if (!validRanges.includes(timeRange)) {
        return '7days'; // Default fallback
    }
    return timeRange;
};

export function validateMetrics(metrics) {
    if (!metrics || typeof metrics !== 'object') return false;
    
    return (
        typeof metrics.totalViews === 'number' && metrics.totalViews >= 0 &&
        typeof metrics.uniqueVisitors === 'number' && metrics.uniqueVisitors >= 0 &&
        typeof metrics.totalPosts === 'number' && metrics.totalPosts >= 0
    );
}

export function validateTrafficSources(sources) {
    if (!Array.isArray(sources) || sources.length === 0) return false;
    
    const totalPercentage = sources.reduce((sum, item) => sum + (item.percentage || 0), 0);
    return totalPercentage === 100;
};

export const validateSettingsForm = (values = {}) => {
    const errors = {};

    // General Settings
    if (!values.siteName || !values.siteName.trim()) {
        errors.siteName = 'Site name is required';
    } else if (values.siteName.trim().length < 2) {
        errors.siteName = 'Site name must be at least 2 characters long';
    }

    if (!values.tagline || !values.tagline.trim()) {
        errors.tagline = 'Tagline is required';
    } else if (values.tagline.trim().length < 3) {
        errors.tagline = 'Tagline must be at least 3 characters long';
    }

    if (!values.timezone || !values.timezone.trim()) {
        errors.timezone = 'Timezone is required';
    }

    if (!values.language || !values.language.trim()) {
        errors.language = 'Default language is required';
    }

    // Security Settings
    if (
        values.passwordExpireDays === '' ||
        values.passwordExpireDays === null ||
        values.passwordExpireDays === undefined
    ) {
        errors.passwordExpireDays = 'Password expiration days is required';
    } else {
        const passwordDays = Number(values.passwordExpireDays);
        if (!Number.isInteger(passwordDays) || passwordDays < 1 || passwordDays > 3650) {
            errors.passwordExpireDays = 'Password expiration must be between 1 and 3650 days';
        }
    }

    if (
        values.sessionTimeout === '' ||
        values.sessionTimeout === null ||
        values.sessionTimeout === undefined
    ) {
        errors.sessionTimeout = 'Session timeout is required';
    } else {
        const timeout = Number(values.sessionTimeout);
        if (!Number.isInteger(timeout) || timeout < 1 || timeout > 1440) {
            errors.sessionTimeout = 'Session timeout must be between 1 and 1440 minutes';
        }
    }

    // SMTP Settings
    if (!values.smtpHost || !values.smtpHost.trim()) {
        errors.smtpHost = 'SMTP host is required';
    } else if (values.smtpHost.trim().length < 3) {
        errors.smtpHost = 'SMTP host must be at least 3 characters long';
    }

    if (
        values.smtpPort === '' ||
        values.smtpPort === null ||
        values.smtpPort === undefined
    ) {
        errors.smtpPort = 'SMTP port is required';
    } else {
        const smtpPort = Number(values.smtpPort);
        if (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535) {
            errors.smtpPort = 'SMTP port must be between 1 and 65535';
        }
    }

    if (!values.smtpUser || !values.smtpUser.trim()) {
        errors.smtpUser = 'SMTP username is required';
    }

    if (!values.smtpPass || !values.smtpPass.trim()) {
        errors.smtpPass = 'SMTP password is required';
    } else if (values.smtpPass.length < 4) {
        errors.smtpPass = 'SMTP password must be at least 4 characters long';
    }

    // API & Integrations
    if (values.googleAnalyticsId && !values.googleAnalyticsId.trim()) {
        errors.googleAnalyticsId = 'Google Analytics ID cannot contain only spaces';
    }

    if (values.paymentGatewayKey && !values.paymentGatewayKey.trim()) {
        errors.paymentGatewayKey = 'Payment gateway API key cannot contain only spaces';
    }

    if (values.externalApiKey && !values.externalApiKey.trim()) {
        errors.externalApiKey = 'External API key cannot contain only spaces';
    }

    // Backup & Maintenance
    const validBackupFrequencies = ['daily', 'weekly', 'monthly'];
    if (!values.backupFrequency || !validBackupFrequencies.includes(values.backupFrequency)) {
        errors.backupFrequency = 'Please select a valid backup frequency';
    }

    return errors;
};

export const validateRegisterForm = (values) => {
    const errors = {};

    if (!values.fullName || !values.fullName.trim()) {
        errors.fullName = 'Full name is required';
    } else if (values.fullName.trim().length < 2) {
        errors.fullName = 'Full name must be at least 2 characters long';
    }

    if (!values.username || !values.username.trim()) {
        errors.username = 'Username is required';
    } else if (values.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters long';
    } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
        errors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!values.email || !values.email.trim()) {
        errors.email = 'Email is required';
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(values.email.trim())) {
            errors.email = 'Invalid email address format';
        }
    }

    if (!values.password || values.password === '') {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (!values.role || !values.role.trim()) {
        errors.role = 'Role is required';
    }

    return errors;
};
// Login Form Validation
export const validateLoginForm = (values) => {
    const errors = {};

    if (!values.identifier || !values.identifier.trim()) {
        errors.identifier = 'Username or email is required';
    }

    if (!values.password || values.password === '') {
        errors.password = 'Password is required';
    }

    return errors;
};

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

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