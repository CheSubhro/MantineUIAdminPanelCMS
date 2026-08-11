
Analytics & Dashboard Module - Backend Checklist
[ ] Database Aggregation & Metrics Controllers (src/controllers/analytics.controller.js)

getDashboardMetrics: Aggregate totals for views, unique visitors, total posts, total pages, and total users (supporting time range filtering query parameters such as 7days, 30days, 1year).

getTrafficOverTime: Provide time-series data for chart visualization based on the selected period.

getTrafficSources: Fetch traffic source breakdowns (Search Engines, Direct, Social Media, Referral) with percentage distributions.

getPopularPosts: Query top-performing posts sorted by views, including associated comments count and categories.

getTopCategories: Aggregate category-wise post counts and total views.

getActiveAuthors: Calculate author statistics including total published posts and accumulated views.

getRecentActivity: Fetch recent audit logs or activity history tracking system actions (posts created, updated, deleted, etc.).

[ ] Analytics API Routes Configuration (src/routes/analytics.routes.js)

Set up /api/analytics endpoints (e.g., /metrics, /traffic, /sources, /popular-posts, /categories, /authors, /activity) and connect them with the controller.

Protect routes using admin/moderator authorization middleware.

[ ] Automated Tests & Bruno API Collection

Tests (src/tests/analytics.test.js): Write unit and integration tests using Jest and Supertest to verify aggregated data calculations across different time ranges.

Bruno API Collection (bruno-collections/analytics/*.bru): Prepare collection files for the analytics API endpoints.