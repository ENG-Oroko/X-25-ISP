import { prisma } from "../../utils/prisma.js";

export const getPlan = async (req, res) => {
  try {
    const plan = await prisma.internetPlan.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!plan) return res.status(404).json({ message: "Plan not found" });

    res.json({ plan });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};