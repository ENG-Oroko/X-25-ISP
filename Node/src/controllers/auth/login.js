import { prisma } from "../../utils/prisma.js";
import { comparePassword } from "../../utils/hashPassword.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        fullName: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const ok = await comparePassword(password, user.password);
    if (!ok)
      return res.status(401).json({ message: "Invalid credentials" });

    const access = generateAccessToken({ id: user.id, role: user.role });
    const refresh = generateRefreshToken({ id: user.id });

    res.cookie("access_token", access, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refresh, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    delete user.password;

    return res.json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};