
import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Page title is required'],
            trim: true,
            minlength: [3, 'Page title must be at least 3 characters long'],
        },
        slug: {
            type: String,
            required: [true, 'Slug is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[a-z0-9-]+$/, 'Slug must be lowercase and contain only letters, numbers, and hyphens'],
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
            default: 'Subhro Mondal',
        },
        status: {
            type: String,
            enum: ['Published', 'Draft'],
            default: 'Published',
        },
        excerpt: {
            type: String,
            maxlength: [300, 'Excerpt cannot exceed 300 characters'],
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        updatedAt: {
            type: String,
            default: () => new Date().toISOString().split('T')[0],
        },
    },
    {
        timestamps: true, 
    }
);

const Page = mongoose.model('Page', pageSchema);

export default Page;