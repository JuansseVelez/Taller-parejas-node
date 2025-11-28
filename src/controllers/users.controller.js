import { prisma } from "../prismaClient.js";

export const createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = await prisma.user.create({
      data: {
        email,
        password
      },
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user" });
  }
};
