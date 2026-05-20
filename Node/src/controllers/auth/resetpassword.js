import { prisma } from "../../utils/prisma.js";
import { hashPassword } from "../../utils/hashPassword.js";
import { transporter } from "../../config/smpt.js";
import { passwordResetSuccessTemplate } from "../../templates/passwordResetSuccessTemplate.js";

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword)
      return res.status(400).json({ message: "All fields required" });

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        fullName: true,
        resetPasswordOtp: true,
        resetPasswordOtpExpiry: true,
      },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid request" });

    const validOtp =
      user.resetPasswordOtp === otp &&
      user.resetPasswordOtpExpiry &&
      user.resetPasswordOtpExpiry > new Date();

    if (!validOtp)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    const hashed = await hashPassword(newPassword);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashed,
        resetPasswordOtp: null,
        resetPasswordOtpExpiry: null,
        mustChangePassword: false,
      },
    });

    transporter
      .sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Password Reset Successful",
        html: passwordResetSuccessTemplate(user.fullName),
      })
      .catch((err) => console.error("Email error:", err.message));

    return res.json({
      message: "Password reset successful. Please login again.",
    });
  } catch (err) {
    console.error("RESET_PASSWORD_ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};