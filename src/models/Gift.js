// models/Gift.js
import mongoose from "mongoose";

const GiftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] }, // multiple images
    description: { type: String },
    category: { type: String, required: true, default: "gift" },
  },
  { timestamps: true }
);

export default mongoose.models.Gift || mongoose.model("Gift", GiftSchema);
