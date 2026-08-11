
Category Module Implementation Checklist
1. Database Model Layer (src/models/Category.model.js)
[x] Define Mongoose Schema for Category.

[x] name: String (Required, Trim, Unique)

[x] slug: String (Required, Unique, Lowercase, Indexed)

[x] description: String (Trim)

[x] image: String (Image URL)

[x] imagePublicId: String (Cloudinary Public ID for deletion management)

[x] status: Enum ['Active', 'Inactive'] (Default: 'Active')

[x] postCount: Number (Default: 0)

[x] Enable timestamps: true (createdAt, updatedAt).

2. Controller Layer (src/controllers/category.controller.js)
[x] Wrap controllers with asyncHandler.

[x] getAllCategories:

[x] Implement search support (name or slug).

[x] Implement status filtering (Active, Inactive, All).

[x] Sort by recent updates (updatedAt: -1).

[x] createCategory:

[x] Handle image upload via Cloudinary (uploadOnCloudinary).

[x] Handle duplicate slug errors (MongoDB Error code 11000).

[x] Set default post count to 0.

[x] updateCategory:

[x] Find existing category by ID.

[x] Handle new image replacement (upload new, delete old from Cloudinary).

[x] Support partial updates (runValidators: true).

[x] deleteCategory:

[x] Find and delete single category by ID.

[x] Clean up associated Cloudinary image if exists.

[x] bulkDeleteCategories:

[x] Validate array of IDs.

[x] Delete multiple documents using deleteMany.

[x] Clean up images from Cloudinary in bulk.

3. API Routes Configuration (src/routes/category.routes.js)
[x] Set up Express Router.

[x] Configure endpoints:

[x] GET /api/categories (Fetch all with filters)

[x] POST /api/categories (Create category with image upload middleware)

[x] PUT /api/categories/:id (Update category)

[x] DELETE /api/categories/:id (Delete single category)

[x] DELETE /api/categories/bulk (Bulk delete categories)

[] Secure routes with authentication and role-based access control (RBAC) middleware where applicable.

4. Testing & API Collections
[x] Unit Tests (tests/unit/category.controller.test.js):

[x] Test category creation success and error flows (mocking Model and Cloudinary).

[x] Test status filters and fetch logic.

[x] Integration Tests (tests/integration/category.routes.test.js):

[x] Test HTTP endpoints using Supertest.

[x] Bruno API Collection (bruno-collections/categories/*.bru):

[x] Get All Categories

[x] Create Category

[x] Update Category

[x] Delete Category