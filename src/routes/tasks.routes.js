import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Aplicar el middleware a todas las rutas de tasks
router.use(authMiddleware);

// GET /tasks
router.get("/", getTasks);

// POST /tasks
router.post("/", createTask);

// PUT /tasks/:id
router.put("/:id", updateTask);

// DELETE /tasks/:id
router.delete("/:id", deleteTask);

export default router;
