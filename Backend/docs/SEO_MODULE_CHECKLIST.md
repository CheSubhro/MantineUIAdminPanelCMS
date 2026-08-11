
SEO Module Checklist
[x] SEO Database Model (Seo.model.js): Created the Mongoose schema and model for storing global SEO settings (metaTitle, metaDescription, focusKeyword, ogTitle, ogDescription, ogImage, robotsTxt, and timestamps).

[x] SEO Controller (seo.controller.js): Implemented backend logic to fetch existing SEO configurations (with auto-default creation if missing) and perform upsert operations (findOneAndUpdate with upsert: true) when saving/updating settings.

[x] SEO API Routes (seo.routes.js): Established the GET and PUT endpoints for /api/seo and secured them using the verifyJWT authentication middleware.

[x] Version Control: Committed the complete SEO module implementation using Git.