import express from "express";
import { signup, login } from "./auth.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { getCurrentUser } from "./auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", authenticate, getCurrentUser);

export default router;