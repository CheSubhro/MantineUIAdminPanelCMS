
import { describe, it, test, expect } from 'vitest';
import { 
    validateUserForm, 
    isFormValid,
    validateCategoryForm, 
    validatePostForm,
    validatePageForm,
    isValidEmail,
    validateTimeRange, 
    validateMetrics, 
    validateTrafficSources,
    validateSettingsForm,
    validateRegisterForm, 
    validateLoginForm,
    validateMediaFile,
    MAX_FILE_SIZE
} from './validation';

describe('User Form Validation Utility', () => {
    it('should return no errors for valid user input', () => {
        const validUser = {
            name: 'Subhro Mondal',
            email: 'siltu@example.com',
            role: 'Admin',
            status: 'Active',
        };

        const errors = validateUserForm(validUser);
        expect(errors).toEqual({});
        expect(isFormValid(errors)).toBe(true);
    });

    it('should return error if name is missing or too short', () => {
        const invalidUser1 = { name: '', email: 'test@example.com', role: 'User' };
        const errors1 = validateUserForm(invalidUser1);
        expect(errors1.name).toBe('Name is required.');

        const invalidUser2 = { name: 'A', email: 'test@example.com', role: 'User' };
        const errors2 = validateUserForm(invalidUser2);
        expect(errors2.name).toBe('Name must be at least 2 characters long.');
    });

    it('should return error for missing or invalid email format', () => {
        const invalidUser1 = { name: 'John Doe', email: '', role: 'User' };
        const errors1 = validateUserForm(invalidUser1);
        expect(errors1.email).toBe('Email is required.');

        const invalidUser2 = { name: 'John Doe', email: 'invalid-email', role: 'User' };
        const errors2 = validateUserForm(invalidUser2);
        expect(errors2.email).toBe('Invalid email address format.');
    });

    it('should return error if role is missing', () => {
        const invalidUser = { name: 'John Doe', email: 'john@example.com', role: '' };
        const errors = validateUserForm(invalidUser);
        expect(errors.role).toBe('Role is required.');
    });

    it('isFormValid should return false if errors exist', () => {
        const errors = { name: 'Name is required.' };
        expect(isFormValid(errors)).toBe(false);
    });
});

describe('Validation Utilities', () => {
    
    describe('validateCategoryForm', () => {
        test('should return no errors for valid category input', () => {
            const validValues = {
                name: 'Electronics',
                slug: 'electronics',
                description: 'Gadgets and devices'
            };

            const errors = validateCategoryForm(validValues);
            expect(Object.keys(errors)).toHaveLength(0);
        });

        test('should return errors when name and slug are missing or empty', () => {
            const invalidValues = {
                name: '',
                slug: ''
            };

            const errors = validateCategoryForm(invalidValues);
            expect(errors.name).toBe('Category name is required');
            expect(errors.slug).toBe('Slug is required');
        });

        test('should return error for invalid slug format (uppercase or spaces)', () => {
            const invalidValues = {
                name: 'Mobile Phones',
                slug: 'Mobile Phones!' 
            };

            const errors = validateCategoryForm(invalidValues);
            expect(errors.slug).toBe('Slug must be lowercase and contain only letters, numbers, and hyphens');
        });

        test('should return error if name is too short', () => {
            const invalidValues = {
                name: 'A',
                slug: 'a'
            };

            const errors = validateCategoryForm(invalidValues);
            expect(errors.name).toBe('Category name must be at least 2 characters long');
        });
    });

    describe('validatePostForm', () => {
        test('should return no errors for valid post input', () => {
            const validValues = {
                title: 'Mastering React and Vite',
                slug: 'mastering-react-and-vite',
                author: 'Subhro Mondal',
                excerpt: 'Learn how to use React with Vite efficiently.'
            };

            const errors = validatePostForm(validValues);
            expect(Object.keys(errors)).toHaveLength(0);
        });

        test('should return errors when required fields are missing', () => {
            const invalidValues = {
                title: '',
                slug: '',
                author: ''
            };

            const errors = validatePostForm(invalidValues);
            expect(errors.title).toBe('Post title is required');
            expect(errors.slug).toBe('Slug is required');
            expect(errors.author).toBe('Author name is required');
        });

        test('should return error for invalid post slug format', () => {
            const invalidValues = {
                title: 'Test Post',
                slug: 'Test Post Slug!',
                author: 'Subhro Mondal'
            };

            const errors = validatePostForm(invalidValues);
            expect(errors.slug).toBe('Slug must be lowercase and contain only letters, numbers, and hyphens');
        });
    });

    describe('validatePageForm', () => {
        test('should return no errors for valid page input', () => {
            const validValues = {
                title: 'Privacy Policy',
                slug: 'privacy-policy',
                author: 'Subhro Mondal',
                excerpt: 'Learn how we handle data.'
            };

            const errors = validatePageForm(validValues);
            expect(Object.keys(errors)).toHaveLength(0);
        });

        test('should return errors when required page fields are missing', () => {
            const invalidValues = {
                title: '',
                slug: '',
                author: ''
            };

            const errors = validatePageForm(invalidValues);
            expect(errors.title).toBe('Page title is required');
            expect(errors.slug).toBe('Slug is required');
            expect(errors.author).toBe('Author name is required');
        });
    });

    describe('isValidEmail', () => {
        test('should return true for valid email addresses', () => {
            expect(isValidEmail('test@example.com')).toBe(true);
            expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
        });

        test('should return false for invalid email addresses', () => {
            expect(isValidEmail('invalid-email')).toBe(false);
            expect(isValidEmail('user@domain')).toBe(false);
            expect(isValidEmail('')).toBe(false);
        });
    });
})

describe('Analytics Validation Utilities', () => {
    describe('validateTimeRange', () => {
        it('should return the correct time range if valid', () => {
            expect(validateTimeRange('30days')).toBe('30days');
            expect(validateTimeRange('1year')).toBe('1year');
        });

        it('should return default "7days" for invalid or unknown time ranges', () => {
            expect(validateTimeRange('invalid_range')).toBe('7days');
            expect(validateTimeRange(null)).toBe('7days');
            expect(validateTimeRange(undefined)).toBe('7days');
        });
    });

    describe('validateMetrics', () => {
        it('should return true for valid metrics object', () => {
            const validMetrics = { totalViews: 45230, uniqueVisitors: 12450, totalPosts: 24 };
            expect(validateMetrics(validMetrics)).toBe(true);
        });

        it('should return false for invalid or missing metrics data', () => {
            expect(validateMetrics(null)).toBe(false);
            expect(validateMetrics({ totalViews: -100, uniqueVisitors: 1200, totalPosts: 5 })).toBe(false);
            expect(validateMetrics({ totalViews: '45000', uniqueVisitors: 12450, totalPosts: 24 })).toBe(false);
        });
    });

    describe('validateTrafficSources', () => {
        it('should return true if traffic sources percentages sum up to 100', () => {
            const validSources = [
                { source: 'Search Engines', percentage: 45 },
                { source: 'Direct', percentage: 25 },
                { source: 'Social Media', percentage: 20 },
                { source: 'Referral', percentage: 10 },
            ];
            expect(validateTrafficSources(validSources)).toBe(true);
        });

        it('should return false if percentages do not sum to 100 or input is invalid', () => {
            const invalidSources = [
                { source: 'Search Engines', percentage: 50 },
                { source: 'Direct', percentage: 30 },
            ];
            expect(validateTrafficSources(invalidSources)).toBe(false);
            expect(validateTrafficSources([])).toBe(false);
            expect(validateTrafficSources(null)).toBe(false);
        });
    });
});

/* System Settings Validation Tests */
describe('validateSettingsForm', () => {
    const validSettings = {
        siteName: 'My Application',
        tagline: 'Building amazing apps with React and Vite',
        timezone: 'UTC (Coordinated Universal Time)',
        language: 'en',
        systemEmailAlerts: true,
        pushNotifications: true,
        smsAlerts: false,

        twoFactorAuth: true,
        passwordExpireDays: '90',
        sessionTimeout: '30',

        smtpHost: 'smtp.mailtrap.io',
        smtpPort: '587',
        smtpUser: 'admin@example.com',
        smtpPass: 'secure-password',

        googleAnalyticsId: 'UA-XXXXXXXXX-X',
        paymentGatewayKey: 'pk_test_123456',
        externalApiKey: 'external-api-key',

        backupFrequency: 'daily',
        maintenanceMode: false
    };

    test('should return no errors for valid settings', () => {
        const errors = validateSettingsForm(validSettings);
        expect(errors).toEqual({});
        expect(isFormValid(errors)).toBe(true);
    });

    test('should return errors for missing general settings', () => {
        const values = {
            ...validSettings,
            siteName: '',
            tagline: '',
            timezone: '',
            language: ''
        };

        const errors = validateSettingsForm(values);
        expect(errors.siteName).toBe('Site name is required');
        expect(errors.tagline).toBe('Tagline is required');
        expect(errors.timezone).toBe('Timezone is required');
        expect(errors.language).toBe('Default language is required');
    });

    test('should return errors for invalid security values', () => {
        const values = {
            ...validSettings,
            passwordExpireDays: '0',
            sessionTimeout: '2000'
        };

        const errors = validateSettingsForm(values);
        expect(errors.passwordExpireDays).toBe('Password expiration must be between 1 and 3650 days');
        expect(errors.sessionTimeout).toBe('Session timeout must be between 1 and 1440 minutes');
    });

    test('should return errors for empty SMTP fields', () => {
        const values = {
            ...validSettings,
            smtpHost: '',
            smtpPort: '',
            smtpUser: '',
            smtpPass: ''
        };

        const errors = validateSettingsForm(values);
        expect(errors.smtpHost).toBe('SMTP host is required');
        expect(errors.smtpPort).toBe('SMTP port is required');
        expect(errors.smtpUser).toBe('SMTP username is required');
        expect(errors.smtpPass).toBe('SMTP password is required');
    });

    test('should return an error for invalid SMTP port', () => {
        const values = {
            ...validSettings,
            smtpPort: '70000'
        };

        const errors = validateSettingsForm(values);
        expect(errors.smtpPort).toBe('SMTP port must be between 1 and 65535');
    });

    test('should return an error for short SMTP password', () => {
        const values = {
            ...validSettings,
            smtpPass: '123'
        };

        const errors = validateSettingsForm(values);
        expect(errors.smtpPass).toBe('SMTP password must be at least 4 characters long');
    });

    test('should return an error for invalid backup frequency', () => {
        const values = {
            ...validSettings,
            backupFrequency: 'yearly'
        };

        const errors = validateSettingsForm(values);
        expect(errors.backupFrequency).toBe('Please select a valid backup frequency');
    });
});

describe('Auth Validation Utilities (Register & Login)', () => {
    describe('validateRegisterForm', () => {
        test('should return no errors for valid register input', () => {
            const validValues = {
                fullName: 'John Doe',
                username: 'johndoe',
                email: 'john@example.com',
                password: 'securepassword123',
                role: 'Admin'
            };

            const errors = validateRegisterForm(validValues);
            expect(Object.keys(errors)).toHaveLength(0);
        });

        test('should return errors when required register fields are missing', () => {
            const invalidValues = {
                fullName: '',
                username: '',
                email: '',
                password: '',
                role: ''
            };

            const errors = validateRegisterForm(invalidValues);
            expect(errors.fullName).toBe('Full name is required');
            expect(errors.username).toBe('Username is required');
            expect(errors.email).toBe('Email is required');
            expect(errors.password).toBe('Password is required');
            expect(errors.role).toBe('Role is required');
        });

        test('should return error for invalid username format or short password', () => {
            const invalidValues = {
                fullName: 'John Doe',
                username: 'john doe!', // spaces and special chars not allowed
                email: 'john@example.com',
                password: '123', // too short
                role: 'Admin'
            };

            const errors = validateRegisterForm(invalidValues);
            expect(errors.username).toBe('Username can only contain letters, numbers, and underscores');
            expect(errors.password).toBe('Password must be at least 6 characters long');
        });
    });

    describe('validateLoginForm', () => {
        test('should return no errors for valid login input', () => {
            const validValues = {
                identifier: 'johndoe',
                password: 'securepassword123'
            };

            const errors = validateLoginForm(validValues);
            expect(Object.keys(errors)).toHaveLength(0);
        });

        test('should return errors when login identifier or password is missing', () => {
            const invalidValues = {
                identifier: '',
                password: ''
            };

            const errors = validateLoginForm(invalidValues);
            expect(errors.identifier).toBe('Username or email is required');
            expect(errors.password).toBe('Password is required');
        });
    });
});

describe('Media Validation Utility', () => {
    it('should return valid for a correct image file', () => {
        const validFile = { type: 'image/jpeg', size: 1024 * 1024 }; // 1MB
        const result = validateMediaFile(validFile);
        expect(result.isValid).toBe(true);
    });

    it('should return invalid for an unsupported file type', () => {
        const invalidFile = { type: 'application/pdf', size: 1024 * 1024 };
        const result = validateMediaFile(invalidFile);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Invalid file type');
    });

    it('should return invalid if file size exceeds the limit', () => {
        const largeFile = { type: 'image/png', size: MAX_FILE_SIZE + 1000 };
        const result = validateMediaFile(largeFile);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('File size exceeds');
    });

    it('should return invalid if no file is provided', () => {
        const result = validateMediaFile(null);
        expect(result.isValid).toBe(false);
        expect(result.message).toBe('No file provided.');
    });
});