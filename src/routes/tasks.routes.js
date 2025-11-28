import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";

const router = Router();

// GET /tasks
router.get("/", getTasks);

// POST /tasks
router.post("/", createTask);

// PUT /tasks/:id
router.put("/:id", updateTask);

// DELETE /tasks/:id
router.delete("/:id", deleteTask);

export default router;
