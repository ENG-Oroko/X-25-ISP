import { prisma } from "../../utils/prisma.js";

export const createSubscription = async (req, res) => {
  try {
    const { clientId, planId, endDate } = req.body;

    if (!clientId || !planId || !endDate)
      return res.status(400).json({
        message: "clientId, planId and endDate required",
      });

    const subscription = await prisma.subscription.create({
      data: {
        clientId: Number(clientId),
        planId: Number(planId),
        endDate: new Date(endDate),
        status: "ACTIVE",
      },
    });

    res.status(201).json({
      message: "Subscription created",
      subscription,
    });

  } catch {
    res.status(500).json({
      message: "Server error",
    });
  }
};