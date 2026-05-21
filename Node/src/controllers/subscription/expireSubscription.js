import { prisma } from "../../utils/prisma.js";

export const expireSubscription = async (req, res) => {
  try {
    await prisma.subscription.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        status: "EXPIRED",
      },
    });

    res.json({
      message: "Subscription expired",
    });

  } catch {
    res.status(500).json({
      message: "Server error",
    });
  }
};