import express from "express";
import {
  createProperty,
  getAllProperties,
  getOwnerProperties,
  updateProperty,
  deleteProperty,
} from "./property.controller.js";

import {
  authenticate,
  authorize,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Owner Dashboard
router.get(
  "/owner/my",
  authenticate,
  authorize("owner"),
  getOwnerProperties
);

// Home dashboard
router.get("/", getAllProperties);

// Owner Only
router.post(
  "/",
  authenticate,
  authorize("owner"),
  createProperty
);

// UPDATE PROPERTY
router.put(
  "/:id",
  authenticate,
  authorize("owner"),
  updateProperty
);

// DELETE PROPERTY
router.delete(
  "/:id",
  authenticate,
  authorize("owner"),
  deleteProperty
);

export default router;