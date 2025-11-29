
import express from "express";
import dotenv from "dotenv";
import tasksRoutes from "./routes/tasks.routes.js";
import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import { authLimiter, tasksLimiter } from "./config/rateLimiter.js";
import passport from "./config/passport.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use("/tasks", tasksLimiter, tasksRoutes);
app.use("/users", usersRoutes);
app.use("/auth", authLimiter, authRoutes);
app.use(cors({
  origin: "*",
  credentials: true, 
}));
app.use(passport.initialize());


app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
