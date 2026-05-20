import { prisma } from "../../utils/prisma.js";
import { comparePassword, hashPassword } from "../../utils/hashPassword.js";
import { transporter } from "../../config/smpt.js";
import { passwordChangedTemplate } from "../../templates/passwordChangedTemplate.js";

export const changePassword = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: "Old & new password required" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, fullName: true, password: true },
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const ok = await comparePassword(oldPassword, user.password);
    if (!ok)
      return res.status(401).json({ message: "Old password incorrect" });

    const hashed = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashed,
        mustChangePassword: false,
      },
    });

    transporter
      .sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Password Changed",
        html: passwordChangedTemplate(user.fullName),
      })
      .catch((err) => console.error("Email error:", err.message));

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return res.json({
      message: "Password updated. Please login again.",
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};