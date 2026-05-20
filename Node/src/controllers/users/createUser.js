import { prisma } from "../../utils/prisma.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { generatePassword } from "../../utils/generatePassword.js";
import { transporter } from "../../config/smpt.js";
import { sendPasswordTemplate } from "../../templates/sendPasswordTemplate.js";

export const createUser = async (req, res) => {
  try {
    const creatorRole = req.user.role;
    const { fullName, email, phone, role } = req.body;

    if (!fullName || !email || !phone)
      return res.status(400).json({ message: "All fields required" });

    if (creatorRole === "TECHNICIAN" && role !== "CLIENT")
      return res.status(403).json({ message: "Technicians can only create clients" });

    if (creatorRole === "CLIENT")
      return res.status(403).json({ message: "Not allowed" });

    // 1. SYSTEM PASSWORD
    const plainPassword = generatePassword();

    // 2. HASH IT
    const hashed = await hashPassword(plainPassword);

    // 3. CREATE USER
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        password: hashed,
        role: role || "CLIENT",
        mustChangePassword: true,
      },
    });

    // 4. SEND EMAIL WITH PASSWORD
    transporter
      .sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Your ISP Account Credentials",
        html: sendPasswordTemplate({
          firstName: fullName,
          email,
          password: plainPassword,
          loginUrl: "http://localhost:5173/login",
        }),
      })
      .catch((err) => console.error("Email error:", err.message));

    return res.status(201).json({
      message: "User created and credentials sent to email",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};