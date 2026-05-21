import { prisma } from "../../utils/prisma.js";

export const getUser = async (req, res) => {
  try {
    const id = req.params.id || req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};