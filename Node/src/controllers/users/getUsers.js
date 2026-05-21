import { prisma } from "../../utils/prisma.js";

export const getUsers = async (_, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
      },
      orderBy: { id: "desc" },
    });

    res.json({ users });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};