import { prisma } from "../../utils/prisma.js";
import { transporter } from "../../config/smpt.js";
import { generateOtp } from "../../utils/generateOTP.js";
import { forgotPasswordOtpTemplate } from "../../templates/forgotPasswordOtpTemplate.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email required" });

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, fullName: true },
    });

    // Always return same response (security best practice)
    if (!user)
      return res.status(200).json({
        message: "If email exists, OTP has been sent",
      });

    const otp = generateOtp();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordOtp: otp,
        resetPasswordOtpExpiry: expiry,
      },
    });

    transporter
      .sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Password Reset OTP",
        html: forgotPasswordOtpTemplate(user.fullName, otp),
      })
      .catch((err) => console.error("Email error:", err.message));

    return res.json({
      message: "If email exists, OTP has been sent",
    });
  } catch (err) {
    console.error("FORGOT_PASSWORD_ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};