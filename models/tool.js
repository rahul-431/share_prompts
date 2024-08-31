import { Schema, model, models } from "mongoose";
const toolSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    features: {
      type: String,
      required: [true, "Prompt is required"],
    },
    link: {
      type: String,
    },
    isFree: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const Tool = models.Tool || model("Tool", toolSchema);
export default Tool;
