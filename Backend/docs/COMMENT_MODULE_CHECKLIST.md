
Comment Management Module - Backend Checklist
[x] Database Model Creation (src/models/Comment.model.js)

Define Mongoose schema including fields: author, email, content, postTitle (or postId reference linking to Post model), status (enum: ['approved', 'pending', 'spam']), and timestamp/date.

Set up indexing on fields like status and postId to optimize filtering and retrieval queries.

[x] Controller Logic (src/controllers/comment.controller.js)

getAllComments: Retrieve comments supporting search queries (filtering by author name, content, or post title) and status filtering (all, approved, pending, spam).

createComment: Handle the creation of a new comment and set its initial default status (e.g., pending).

updateCommentStatus: Update comment status specifically for approvals (approved) or spam labeling (spam).

deleteComment: Single comment deletion by ID.

bulkDeleteComments: Handle batch/bulk deletion of multiple comments simultaneously (if required to align with page/post modules).

sendReply: Handle sending and storing author replies or dispatching notification emails to the commenter.

[x] API Routes Configuration (src/routes/comment.routes.js)

Set up /api/comments endpoints and connect them securely with the comment controller methods.

Apply authorization or admin-only middleware for status updates and deletions.

[x] Automated Tests & Bruno API Collection

Integration Tests (tests/integration/comment.routes.test.js): Written automated integration tests using Jest and Supertest covering all endpoints (GET, POST, PATCH, and DELETE actions).

Unit Tests (tests/unit/comment.controller.test.js): Written automated unit tests using Jest covering controller methods like creation, status updates, and error handling.

Bruno API Collection (bruno-collections/comments/*.bru): Prepare the respective .bru request collection files for the comment module.