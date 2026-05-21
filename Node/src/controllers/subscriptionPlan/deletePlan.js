import { prisma } from "../../utils/prisma.js";

export const deletePlan = async (req, res) => {
  try {
    await prisma.internetPlan.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Plan deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};