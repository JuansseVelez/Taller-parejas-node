import { prisma } from "../prismaClient.js";

// GET /tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    return res.json(tasks);
  } catch (error) {
    console.error("Error recuperando tarea:", error);
    return res.status(500).json({ message: "Error obteniendo tarea" });
  }
};

// POST /tasks
export const createTask = async (req, res) => {
  try {
    const { title, description, state, userId } = req.body;

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        state,
        userId: Number(userId),
      },
    });

    return res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creando tarea:", error);
    return res.status(500).json({ message: "Error creating task" });
  }
};

// PUT /tasks/:id
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, state } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        state,
      },
    });

    return res.json(updatedTask);
  } catch (error) {
    console.error("Error actualizando tarea:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.status(500).json({ message: "Error actualizacion de tarea" });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: Number(id) },
    });

    return res.json({ message: "Tarea eliminada exitosamente" });
  } catch (error) {
    console.error("Error eliminando tarea:", error);

    if (error.code === "P2025") {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    return res.status(500).json({ message: "Error eliminando tarea" });
  }
};
