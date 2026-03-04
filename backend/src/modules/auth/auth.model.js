import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["owner", "buyer"], default: "buyer" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);