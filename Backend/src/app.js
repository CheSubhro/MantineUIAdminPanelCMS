
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import authRouter from "./routes/auth.routes.js";
import userRouter from './routes/user.routes.js';
import categoriesRouter from "./routes/category.routes.js";
import mediaRouter from "./routes/media.routes.js";
import pageRouter from "./routes/page.routes.js";
import postRouter from "./routes/post.routes.js";
import commentsRouter from "./routes/comment.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";
import notificationsRouter from "./routes/notification.routes.js";
import seoRouter from "./routes/seo.routes.js";
import reportsRouter from "./routes/report.routes.js";
import settingsRouter from "./routes/setting.routes.js";


//routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/pages", pageRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentsRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/notifications", notificationsRouter);
app.use("/api/v1/seo", seoRouter);
app.use("/api/v1/reports", reportsRouter);
app.use("/api/v1/settings", settingsRouter);


export { app }
