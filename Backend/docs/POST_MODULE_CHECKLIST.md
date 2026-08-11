
Post Management Module - Backend Checklist (Multer + Cloudinary + MongoDB)

[x] Cloudinary Configuration (src/config/cloudinary.js)

Set up the Cloudinary SDK.
Configure connection using environment variables: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.

[x] Multer Middleware Setup (src/middlewares/upload.middleware.js)

Configure Multer using memoryStorage or streams.

Implement file filtering to restrict uploads to specific image formats (e.g., .jpg, .png, .webp).

[x] Post Database Model Update (src/models/Post.model.js)

Update the Mongoose schema to include: title, slug, excerpt, category, author, status, publishDate, and image (to store the Cloudinary secure_url).

[x] Post Controller Logic (src/controllers/post.controller.js)

createPost: Capture the uploaded file via Multer, upload it to Cloudinary, and save the post data (including the image URL) to MongoDB.

getAllPosts: Implement retrieval with search query and status filtering capabilities.

updatePost: Logic to handle text data updates; if a new image is provided, upload it to Cloudinary and replace the old image URL.

deletePost & bulkDeletePosts: Implement deletion logic; optionally include a cleanup step to remove the corresponding images from Cloudinary for a more professional implementation.

[ ] Post Routes Configuration (src/routes/post.routes.js)

Setup API endpoints (POST, GET, PUT, DELETE).

Integrate the Multer middleware into the relevant routes.

[x] Automated Tests & Bruno API Collection

Tests : Create unit and integration tests using Jest and Supertest, covering all CRUD operations including file upload scenarios.

Bruno API Collection (bruno-collections/posts/*.bru): Prepare the required .bru files for all post-related API requests.