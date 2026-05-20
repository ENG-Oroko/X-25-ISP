import express from "express";
import { login } from "../controllers/auth/login.js";
import { logout } from "../controllers/auth/logout.js";
import { changePassword } from "../controllers/auth/changepassword.js";
import { changeNumber } from "../controllers/auth/changenNumber.js";
import { forgotPassword } from "../controllers/auth/forgotpassword.js";
import { resetPassword } from "../controllers/auth/resetpassword.js";
import { refreshToken } from "../controllers/auth/refreshToken.js";
import { protect } from "../middleware/auth.middleware.js";
import {
  loginRateLimiter,
  logoutRateLimiter,
  forgotPasswordRateLimiter,
  resetPasswordRateLimiter,
  changePasswordRateLimiter,
  changeNumberRateLimiter,
} from "../middleware/authRateLimiter.js";

const router = express.Router();

router.post("/login", loginRateLimiter, login);
router.post("/logout", logoutRateLimiter, logout);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPasswordRateLimiter, forgotPassword);
router.post("/reset-password", resetPasswordRateLimiter, resetPassword);
router.post("/change-password", protect, changePasswordRateLimiter, changePassword);
router.post("/change-phone", protect, changeNumberRateLimiter, changeNumber);

export default router;