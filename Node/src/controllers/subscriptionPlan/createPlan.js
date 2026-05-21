import { prisma } from "../../utils/prisma.js";

export const createPlan = async (req, res) => {
  try {
    const { name, description, speed, price, billingCycle } = req.body;

    const plan = await prisma.internetPlan.create({
      data: {
        name,
        description,
        speed,
        price: Number(price),
        billingCycle,
      },
    });

    res.status(201).json({
      message: "Plan created",
      plan,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};