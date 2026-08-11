
import request from "supertest";
import app from "../../src/app.js"; 
import User from "../../src/models/User.model.js"; 
import mongoose from "mongoose";

describe("Dashboard API Integration Tests", () => {

    let authToken = "";

    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(
                process.env.MONGODB_URI_TEST ||
                    "mongodb://localhost:27017/test-db"
            );
        }
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should return 401 Unauthorized if token is missing", async () => {
        const response = await request(app).get("/api/dashboard/metrics");

        expect(response.status).toBe(401);
    });

    it("should return dashboard metrics successfully with valid authentication", async () => {
        
        const loginRes = await request(app)
            .post("/api/v1/auth/login")
            .send({ identifier: "admin@example.com", password: "Password123!" });
        
        authToken = loginRes.body.data.accessToken;


        const response = await request(app)
            .get("/api/dashboard/metrics?timeRange=7days")
            .set("Cookie", [`accessToken=${authToken}`]); 

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty("metrics");
        expect(response.body.data).toHaveProperty("recentPosts");
        expect(response.body.data.metrics).toHaveProperty("totalPosts");
    });
});