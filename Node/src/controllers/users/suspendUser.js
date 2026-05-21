import { prisma } from "../../utils/prisma.js";

export const suspendUser = async (req, res) => {
  try {
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { status: "SUSPENDED" },
    });

    res.json({ message: "User suspended" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};