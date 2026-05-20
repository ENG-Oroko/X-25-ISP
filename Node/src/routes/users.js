import express from "express";
import { createUser } from "../controllers/users/createUser.js";
import { getUser } from "../controllers/users/getUser.js";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.js";

const router = express.Router();

router.get("/me", protect, getUser);
router.post("/create", protect, allowRoles("ADMIN", "TECHNICIAN"), createUser);

export default router;