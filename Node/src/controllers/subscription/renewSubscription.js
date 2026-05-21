import { prisma } from "../../utils/prisma.js";

export const renewSubscription = async (req, res) => {
  try {
    const { endDate } = req.body;

    const subscription = await prisma.subscription.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        endDate: new Date(endDate),
        status: "ACTIVE",
      },
    });

    res.json({
      message: "Subscription renewed",
      subscription,
    });

  } catch {
    res.status(500).json({
      message: "Server error",
    });
  }
};