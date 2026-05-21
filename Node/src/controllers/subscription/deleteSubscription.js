import { prisma } from "../../utils/prisma.js";

export const deleteSubscription = async (req, res) => {
  try {
    await prisma.subscription.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      message: "Subscription deleted",
    });

  } catch {
    res.status(500).json({
      message: "Server error",
    });
  }
};