import { prisma } from "../../utils/prisma.js";
import { comparePassword } from "../../utils/hashPassword.js";
import { transporter } from "../../config/smpt.js";
import { phoneChangedTemplate } from "../../templates/phoneChangedTemplate.js";

export const changeNumber = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { password, newPhone } = req.body;

    if (!password || !newPhone)
      return res.status(400).json({ message: "Password & new phone required" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, fullName: true, password: true },
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const ok = await comparePassword(password, user.password);
    if (!ok)
      return res.status(401).json({ message: "Incorrect password" });

    const exists = await prisma.user.findUnique({
      where: { phone: newPhone },
      select: { id: true },
    });

    if (exists)
      return res.status(409).json({ message: "Phone already in use" });

    await prisma.user.update({
      where: { id: userId },
      data: { phone: newPhone },
    });

    transporter
      .sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Phone Number Updated",
        html: phoneChangedTemplate(user.fullName, newPhone),
      })
      .catch((err) => console.error("Email error:", err.message));

    return res.json({
      message: "Phone number updated successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};