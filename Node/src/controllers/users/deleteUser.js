import { prisma } from "../../utils/prisma.js";

export const deleteUser = async (req, res) => {
  try {
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { status: "INACTIVE" },
    });

    res.json({ message: "User deactivated" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};