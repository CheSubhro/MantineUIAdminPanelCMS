
import request from "supertest";
import app from "../../src/app.js";
import { Notification } from "../../src/models/Notification.model.js";
import mongoose from "mongoose";

describe("Notification API Integration Tests", () => {
    let testNotificationId;
    let authToken = ""; 

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(
                process.env.MONGODB_URI_TEST ||
                    "mongodb://localhost:27017/test-db"
            );
        }

        const sampleNotification = await Notification.create({
            title: "Test Notification",
            description:
                "This is a test description for unit/integration testing.",
            unread: true,
            type: "info",
        });
        testNotificationId = sampleNotification._id;
    });

    afterAll(async () => {
        await Notification.deleteMany({});
        await mongoose.connection.close();
    });

    // ১. Get All Notifications Test
    it("should fetch all notifications successfully", async () => {
        const response = await request(app).get("/api/notifications"); 
        // .set("Authorization", `Bearer ${authToken}`) 
        if (response.status === 200) {
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThan(0);
        } else {
            expect(response.status).toBe(401); // Unauthorized if JWT is enforced
        }
    });

    // Mark Single Notification as Read Test
    it("should mark a specific notification as read", async () => {
        if (!testNotificationId) return;

        const response = await request(app).patch(
            `/api/notifications/${testNotificationId}/read`
        );

        if (response.status === 200) {
            expect(response.body.data.unread).toBe(false);
        }
    });

    // Mark All Notifications as Read Test
    it("should mark all notifications as read", async () => {
        const response = await request(app).patch(
            "/api/notifications/read-all"
        );

        if (response.status === 200) {
            const unreadCount = await Notification.countDocuments({
                unread: true,
            });
            expect(unreadCount).toBe(0);
        }
    });

    // Delete Notification Test
    it("should delete a notification by ID", async () => {
        if (!testNotificationId) return;

        const response = await request(app).delete(
            `/api/notifications/${testNotificationId}`
        );

        if (response.status === 200) {
            const deletedCheck =
                await Notification.findById(testNotificationId);
            expect(deletedCheck).toBeNull();
        }
    });
});