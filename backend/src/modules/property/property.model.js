import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    type: { type: String, enum: ["rent", "sale"], required: true },
    location: {
      city: String,
      state: String,
      pincode: String,
    },
    images: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Property", propertySchema);