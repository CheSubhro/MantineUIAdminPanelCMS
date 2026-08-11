
User Management Module - Backend Checklist
[x] Database Model Creation (src/models/User.model.js)

Define Mongoose schema including fields: name, email, password (hashed with bcrypt), role (enum: ['Admin', 'Manager', 'User'], etc.), and status (enum: ['Active', 'Inactive']).

Set up unique constraints and indexing on the email field.

[x] Controller Logic (src/controllers/user.controller.js)

getAllUsers: Retrieve all users with search query support (filtering by name, email, or role).

createUser: Handle new user registration/addition, password hashing, and input validation.

updateUser: Update existing user details (name, email, role, status, or password).

deleteUser: Single user deletion by ID.

[x] API Routes Configuration (src/routes/user.routes.js)

Set up /api/users endpoints (GET, POST, PUT/PATCH, DELETE) and connect them securely with the user controller methods.

Apply authentication and role-based access control (RBAC) middleware (e.g., admin-only access for user creation/deletion).

[x] Automated Tests & Bruno API Collection

Integration Tests (tests/integration/user.routes.test.js): Written automated integration tests using Jest and Supertest covering all user CRUD endpoints.

Unit Tests (tests/unit/user.controller.test.js): Written automated unit tests using Jest covering user creation, error handling, and controller logic.

Bruno API Collection (bruno-collections/users/*.bru): Prepare collection files for the user management API endpoints.