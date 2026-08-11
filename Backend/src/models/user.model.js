
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters long"],
        },
        username: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
            minlength: [3, "Username must be at least 3 characters long"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email address",
            ],
        },
        password: {
            type: String,
            required: function () {
                return this.isNew;
            },
            minlength: [8, "Password must be at least 8 characters long"],
            validate: {
                validator: function (value) {
                    if (!this.isModified("password") && !value) return true;
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
                        value
                    );
                },
                message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            },
        },
        // Avatar field (Cloudinary URL - Optional)
        avatar: {
            type: String,
            required: false,
        },
        avatarPublicId: {
            type: String,
            required: false,
        },
        // Cover image field (Cloudinary URL - Optional)
        coverImage: {
            type: String,
            required: false,
        },
        coverImagePublicId: {
            type: String,
            required: false,
        },
        role: {
            type: String,
            enum: [
                "Admin",
                "Manager",
                "Moderator",
                "Editor",
                "User",
                "Author",
                "Contributor",
                "Developer",
                "Customer_Support",
                "Seller",
                "Rider",
                "Accountant",
            ],
            default: "User",
            index: true,
        },
        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
            index: true,
        },
        // Refresh token field (Stored in DB to prevent token hassle)
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to hash password before saving to database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);

export default User;