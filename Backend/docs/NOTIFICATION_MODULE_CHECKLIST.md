
Notification Module Checklist
[x] Notification Database Model (Notification.model.js): Created the schema and model for saving notification data (including title, description, unread, type, and timestamps).

[x] Notification Controller (notification.controller.js): Implemented controller logic to fetch all notifications, mark single or all notifications as read, and delete notifications.

[x] Notification API Routes (notification.routes.js): Created the necessary endpoints (GET, PATCH, DELETE) for notification management and secured them with the verifyJWT middleware.

[x] Integration Testing (notification.routes.test.js): Wrote test cases using Jest and Supertest to verify the correct functionality of the notification APIs.