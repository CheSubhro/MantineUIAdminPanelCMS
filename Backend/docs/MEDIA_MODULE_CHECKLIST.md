
Media Manager Module - Backend & Hook Checklist
[x] Media State Management Hook (src/hooks/useMediaManager.js)

Implement local state initialization with mock media files (INITIAL_MEDIA_FILES).

Set up state handlers for search querying (searchQuery, setSearchQuery) using useMemo for real-time file filtering (filteredMediaFiles).

Add clipboard copy functionality (handleCopyUrl) with Mantine notification feedback (notifications.show).

Implement file deletion logic (handleDeleteFunction) with state updates and notifications.

Manage upload simulation (handleUpload) with loading states (loading), modal toggle states (opened, setOpened), and success notifications.

[x] Media Database Model Creation (src/models/Media.model.js)

Define Mongoose schema including fields: name, url, size, publicId (for Cloudinary), and uploadedBy (reference to User model).

Add timestamps (createdAt, updatedAt) to track upload dates.

Implement prevention check against OverwriteModelError using mongoose.models.Media || mongoose.model("Media", mediaSchema).

[x] Media Controller Logic (src/controllers/media.controller.js)

getMediaFiles: Fetch all uploaded media files from MongoDB sorted by newest first.

uploadMedia: Handle file uploads (integrating with Cloudinary/Multer), save file details to MongoDB, and return the uploaded file object.

deleteMedia: Delete a media file record from MongoDB (and optionally remove from Cloudinary) using its id.

[x] Media API Routes Configuration (src/routes/media.routes.js)

Set up endpoints: GET /api/media, POST /api/media/upload, and DELETE /api/media/:id.

Protect private media routes using the authentication middleware (verifyJWT).

[x] Automated Tests & Bruno API Collection

Unit Tests (tests/unit/media.controller.test.js): Write unit tests using Jest covering media fetching, uploading, and deletion logic.

Integration Tests (tests/integration/media.routes.test.js): Write integration tests using Jest and Supertest for media API endpoints.

Bruno API Collection (bruno-collections/media/*.bru): Prepare collection files for all media requests (Get All Media, Upload Media, Delete Media).