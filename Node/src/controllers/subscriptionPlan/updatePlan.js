import { prisma } from "../../utils/prisma.js";

export const updatePlan = async (req, res) => {
  try {
    const { name, description, speed, price, billingCycle, status } = req.body;

    const plan = await prisma.internetPlan.update({
      where: { id: Number(req.params.id) },
      data: {
        name,
        description,
        speed,
        price: Number(price),
        billingCycle,
        status,
      },
    });

    res.json({ message: "Plan updated", plan });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};