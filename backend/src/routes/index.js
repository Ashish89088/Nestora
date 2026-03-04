import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import propertyRoutes from "../modules/property/property.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/properties", propertyRoutes);

export default router;