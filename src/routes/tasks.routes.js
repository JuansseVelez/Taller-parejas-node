import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import passport from 'passport';

const router = Router();

// Proteger TODAS las rutas con Passport JWT
// passport.authenticate('jwt', { session: false }) verifica el token
// y adjunta el usuario completo en req.user
router.use(passport.authenticate('jwt', { session: false }));

// GET /tasks
router.get("/", getTasks);

// POST /tasks
router.post("/", createTask);

// PUT /tasks/:id
router.put("/:id", updateTask);

// DELETE /tasks/:id
router.delete("/:id", deleteTask);

export default router;