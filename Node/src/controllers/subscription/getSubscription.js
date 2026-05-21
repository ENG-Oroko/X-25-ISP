import { prisma } from "../../utils/prisma.js";

export const getSubscription = async (req, res) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        client: true,
        plan: true,
        payments: true,
      },
    });

    if (!subscription)
      return res.status(404).json({
        message: "Subscription not found",
      });

    res.json({ subscription });

  } catch {
    res.status(500).json({
      message: "Server error",
    });
  }
};