import express from "express";

import { createSubscription } from "../controllers/subscription/createSubscription.js";
import { getSubscriptions } from "../controllers/subscription/getSubscriptions.js";
import { getSubscription } from "../controllers/subscription/getSubscription.js";
import { renewSubscription } from "../controllers/subscription/renewSubscription.js";
import { cancelSubscription } from "../controllers/subscription/cancelSubscription.js";
import { expireSubscription } from "../controllers/subscription/expireSubscription.js";
import { deleteSubscription } from "../controllers/subscription/deleteSubscription.js";

import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.js";

const router = express.Router();

router.get("/", protect, allowRoles("ADMIN", "TECHNICIAN"), getSubscriptions);
router.get("/:id", protect, getSubscription);

router.post("/create", protect, allowRoles("ADMIN", "TECHNICIAN"), createSubscription);

router.patch("/:id/renew", protect, allowRoles("ADMIN", "TECHNICIAN"), renewSubscription);
router.patch("/:id/cancel", protect, allowRoles("ADMIN"), cancelSubscription);
router.patch("/:id/expire", protect, allowRoles("ADMIN"), expireSubscription);

router.delete("/:id", protect, allowRoles("ADMIN"), deleteSubscription);

export default router;