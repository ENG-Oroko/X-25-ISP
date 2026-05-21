import express from "express";

import { getUsers } from "../controllers/users/getUsers.js";
import { getUser } from "../controllers/users/getUser.js";
import { createUser } from "../controllers/users/createUser.js";
import { updateUser } from "../controllers/users/updateUser.js";
import { deleteUser } from "../controllers/users/deleteUser.js";
import { suspendUser } from "../controllers/users/suspendUser.js";
import { activateUser } from "../controllers/users/activateUser.js";
import { changeRole } from "../controllers/users/changeRole.js";
import { resetUserPassword } from "../controllers/users/resetUserPassword.js";
import { assignPlan } from "../controllers/users/assignPlan.js";

import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.js";

const router = express.Router();

router.get("/", protect, allowRoles("ADMIN", "TECHNICIAN"), getUsers);
router.get("/me", protect, getUser);
router.get("/:id", protect, allowRoles("ADMIN", "TECHNICIAN"), getUser);

router.post("/create", protect, allowRoles("ADMIN", "TECHNICIAN"), createUser);

router.put("/:id", protect, allowRoles("ADMIN", "TECHNICIAN"), updateUser);

router.delete("/:id", protect, allowRoles("ADMIN"), deleteUser);

router.patch("/:id/suspend", protect, allowRoles("ADMIN"), suspendUser);
router.patch("/:id/activate", protect, allowRoles("ADMIN"), activateUser);
router.patch("/:id/role", protect, allowRoles("ADMIN"), changeRole);

router.post("/:id/reset-password", protect, allowRoles("ADMIN"), resetUserPassword);

router.post("/:id/assign-plan", protect, allowRoles("ADMIN", "TECHNICIAN"), assignPlan);

export default router;