import { prisma } from "../../utils/prisma.js";

export const cancelSubscription = async (req, res) => {
  try {
    await prisma.subscription.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: "CANCELLED",
      },
    });

    res.json({
      message: "Subscription cancelled",
    });

  } catch {
    res.status(500).json({
      message: "Server error",
    });
  }
};