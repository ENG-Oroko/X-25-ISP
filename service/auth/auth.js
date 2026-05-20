import { api } from "../api.js";

// LOGIN
export const login = (data) =>
  api.post("/auth/login", data).then(res => res.data);

// LOGOUT
export const logout = () =>
  api.post("/auth/logout").then(res => res.data);

// FORGOT PASSWORD
export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email }).then(res => res.data);

// RESET PASSWORD
export const resetPassword = (data) =>
  api.post("/auth/reset-password", data).then(res => res.data);

// REFRESH TOKEN
export const refreshToken = () =>
  api.post("/auth/refresh-token").then(res => res.data);

// CHANGE PASSWORD
export const changePassword = (data) =>
  api.post("/auth/change-password", data).then(res => res.data);

// CHANGE PHONE
export const changePhone = (data) =>
  api.post("/auth/change-number", data).then(res => res.data);