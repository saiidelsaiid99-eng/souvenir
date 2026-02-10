import mongoose from "mongoose";

const CustomGiftSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    customDetails: { type: String },
    category: { type: String, required: true }, // should be "custom-gift"
    images: { type: [String], default: [] }, // array of image URLs
  },
  { timestamps: true }
);

export default mongoose.models.CustomGift ||
  mongoose.model("CustomGift", CustomGiftSchema);
