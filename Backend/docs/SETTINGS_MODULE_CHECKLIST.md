
Settings Module Checklist
[x] Settings Database Model (Setting.model.js): Created the Mongoose schema and model for storing global system configurations (including General, Notifications, Security, SMTP, API Integrations, Backup & Maintenance options).

[x] Settings Controller (setting.controller.js): Implemented backend logic to fetch system configurations (with auto-creation of default settings if none exist) and handle upsert updates (findOneAndUpdate with upsert: true).

[x] Settings API Routes (setting.routes.js): Set up the GET and PUT endpoints for /api/settings and secured them using the verifyJWT authentication middleware.

[x] Integration Testing (setting.routes.test.js): Wrote integration test cases using Jest and Supertest to verify fetching and updating system settings.

[x] Version Control: Committed the complete settings module implementation along with its tests using Git.