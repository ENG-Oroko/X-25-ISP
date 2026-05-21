import { prisma } from "../../utils/prisma.js";

export const updateUser = async (req, res) => {
  try {
    const { fullName, phone } = req.body;

    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { fullName, phone },
    });

    res.json({ message: "User updated", user });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};