import cors from "cors";
import express from "express";
import analyticsRoutes from "./routes/analytics.routes";
import authRoutes from "./routes/auth.routes";
import bookmarkRoutes from "./routes/bookmark.routes";
import categoryRoutes from "./routes/category.routes";
import chatRoutes from "./routes/chat.routes";
import emailRoutes from "./routes/email.routes";
import eventRoutes from "./routes/event.routes";
import forumRoutes from "./routes/forum.routes";
import resourceRoutes from "./routes/resource.routes";
import reviewRoutes from "./routes/review.routes";
import subscriberRoutes from "./routes/subscriber.routes";
import userRoutes from "./routes/user.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/subscribe", subscriberRoutes);

app.use("/api/users", userRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/email", emailRoutes);

export default app;
