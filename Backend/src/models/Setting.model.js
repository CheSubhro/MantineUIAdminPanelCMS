
import mongoose, { Schema } from "mongoose";

const settingSchema = new Schema(
    {
        // General
        siteName: { type: String, default: "My Application" },
        tagline: {
            type: String,
            default: "Building amazing apps with React & Vite",
        },
        timezone: { type: String, default: "UTC (Coordinated Universal Time)" },
        language: { type: String, default: "en" },

        // Notifications
        systemEmailAlerts: { type: Boolean, default: true },
        pushNotifications: { type: Boolean, default: true },
        smsAlerts: { type: Boolean, default: false },

        // Security & Access Control
        twoFactorAuth: { type: Boolean, default: true },
        passwordExpireDays: { type: String, default: "90" },
        sessionTimeout: { type: String, default: "30" },

        // Email / SMTP
        smtpHost: { type: String, default: "smtp.mailtrap.io" },
        smtpPort: { type: String, default: "587" },
        smtpUser: { type: String, default: "" },
        smtpPass: { type: String, default: "" },

        // API & Integrations
        googleAnalyticsId: { type: String, default: "UA-XXXXXXXXX-X" },
        paymentGatewayKey: { type: String, default: "" },
        externalApiKey: { type: String, default: "" },

        // Backup & Maintenance
        backupFrequency: { type: String, default: "daily" },
        maintenanceMode: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Setting = mongoose.model("Setting", settingSchema);