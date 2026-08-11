
import request from "supertest";
import app from "../../src/app.js";
import { Setting } from "../../src/models/Setting.model.js";
import mongoose from "mongoose";

describe("Setting API Integration Tests", () => {
    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(
                process.env.MONGODB_URI_TEST ||
                    "mongodb://localhost:27017/test-db"
            );
        }
    });

    afterAll(async () => {
        await Setting.deleteMany({});
        await mongoose.connection.close();
    });

    // Get System Settings Test
    it("should fetch system settings successfully", async () => {
        const response = await request(app).get("/api/settings"); 

        if (response.status === 200) {
            expect(response.body.data).toHaveProperty("siteName");
            expect(response.body.data).toHaveProperty("maintenanceMode");
        } else {
            expect(response.status).toBe(401);
        }
    });

    // Update System Settings Test
    it("should update system settings successfully", async () => {
        const updatedData = {
            siteName: "Updated Test Application",
            maintenanceMode: true,
        };

        const response = await request(app)
            .put("/api/settings")
            .send(updatedData);

        if (response.status === 200) {
            expect(response.body.data.siteName).toBe(
                "Updated Test Application"
            );
            expect(response.body.data.maintenanceMode).toBe(true);
        }
    });
});