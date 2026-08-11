
[x] Dashboard Frontend & Hook Setup: Implemented the useDashboard.js hook managing local state, time range filtering (7days, 30days, 3months, year), and simulated/demo data handling.

[x] Dashboard Controller (dashboard.controller.js): Developed real-time data fetching logic by directly querying (countDocuments, find, aggregate) the User and Post collections without requiring a separate dashboard model.

[x] Dashboard API Routes (dashboard.routes.js): Created the /metrics endpoint and protected private dashboard routes using the verifyJWT authentication middleware.

[x] Integration & Unit Testing: Set up test structures (dashboard.routes.test.js) to verify that the dashboard API endpoints are properly secured and returning data in the correct format.