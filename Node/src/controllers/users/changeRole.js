import { prisma } from "../../utils/prisma.js";

export const changeRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { role },
    });

    res.json({ message: "Role updated", user });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};