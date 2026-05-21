import { prisma } from "../../utils/prisma.js";

export const getSubscriptions = async (_, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: {
        client: true,
        plan: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json({ subscriptions });

  } catch {
    res.status(500).json({
      message: "Server error",
    });
  }
};