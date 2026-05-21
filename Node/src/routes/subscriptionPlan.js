import express from "express";

import { createPlan } from "../controllers/subscriptionPlan/createPlan.js";
import { getPlans } from "../controllers/subscriptionPlan/getPlans.js";
import { getPlan } from "../controllers/subscriptionPlan/getPlan.js";
import { updatePlan } from "../controllers/subscriptionPlan/updatePlan.js";
import { deletePlan } from "../controllers/subscriptionPlan/deletePlan.js";

import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.js";

const router = express.Router();

router.get("/", protect, getPlans);
router.get("/:id", protect, getPlan);

router.post("/create", protect, allowRoles("ADMIN", "TECHNICIAN"), createPlan);

router.put("/:id", protect, allowRoles("ADMIN", "TECHNICIAN"), updatePlan);

router.delete("/:id", protect, allowRoles("ADMIN"), deletePlan);

export default router;