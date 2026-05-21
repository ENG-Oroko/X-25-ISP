import { prisma } from "../../utils/prisma.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { generatePassword } from "../../utils/generatePassword.js";

export const resetUserPassword = async (req, res) => {
  try {
    const password = generatePassword();

    const hashed = await hashPassword(password);

    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: {
        password: hashed,
        mustChangePassword: true,
      },
    });

    res.json({
      message: "Password reset successful",
      password,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};