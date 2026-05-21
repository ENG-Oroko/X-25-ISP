import { prisma } from "../../utils/prisma.js";

export const getPlans = async (_, res) => {
  try {
    const plans = await prisma.internetPlan.findMany({
      orderBy: { id: "desc" },
    });

    res.json({ plans });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};