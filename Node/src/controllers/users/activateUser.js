import { prisma } from "../../utils/prisma.js";

export const activateUser = async (req, res) => {
  try {
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { status: "ACTIVE" },
    });

    res.json({ message: "User activated" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};