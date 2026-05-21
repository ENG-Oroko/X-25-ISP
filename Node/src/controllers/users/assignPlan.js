import { prisma } from "../../utils/prisma.js";

export const assignPlan = async (req, res) => {
  try {
    const { planId, endDate } = req.body;

    const subscription = await prisma.subscription.create({
      data: {
        clientId: Number(req.params.id),
        planId,
        endDate: new Date(endDate),
        status: "ACTIVE",
      },
    });

    res.json({
      message: "Plan assigned",
      subscription,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};