import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos obligatorios
    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son requeridos" });
    }

    // Validar si el email ya está registrado
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    // Hash de contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser.id,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el registro" });
  }
};
