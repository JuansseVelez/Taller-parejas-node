import { prisma } from "../prismaClient.js";

// GET /tasks
export const getTasks = async (req, res) => {
  try {
    const { userId } = req.user; // Obtener userId del token decodificado
    const tasks = await prisma.task.findMany();
    where: { userId: Number(userId) } // Filtrar tareas por userId
    return res.json(tasks);
  } catch (error) {
    console.error("Error recuperando tarea:", error);
    return res.status(500).json({ message: "Error obteniendo tarea" });
  }
};

// POST /tasks
export const createTask = async (req, res) => {
  try {
    const { userId } = req.user; // Obtener userId del token decodificado   
    const { title, description, state } = req.body;

    if (!title) {
      return res.status(400).json({ message: "El título es requerido" });
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        state: state || "pending",
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
    const { userId } = req.user; // Obtener userId del token decodificado
    const { id } = req.params;
    const { title, description, state } = req.body;
    
    // Verificamos que la tarea existe Y pertenece al usuario
    const existingTask = await prisma.task.findFirst({
      where: { 
        id: Number(id),
        userId: userId 
      }
    });

    if (!existingTask) {
      return res.status(404).json({ 
        message: "Tarea no encontrada o no tienes permiso para modificarla" 
      });
    }

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
    const { userId } = req.user; // Obtener userId del token decodificado
    const { id } = req.params;
    
    // Verificamos que la tarea existe Y pertenece al usuario
    const existingTask = await prisma.task.findFirst({
      where: { 
        id: Number(id),
        userId: userId 
      }
    });

    if (!existingTask) {
      return res.status(404).json({ 
        message: "Tarea no encontrada o no tienes permiso para eliminarla" 
      });
    }

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
