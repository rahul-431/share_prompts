import { Schema, model, models } from "mongoose";
const promptSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
    },
    tag: {
      type: String,
      required: [true, "Tag is required"],
    },
    tools: {
      type: String,
    },
  },
  { timestamps: true }
);
const Prompt = models.Prompt || model("Prompt", promptSchema);
export default Prompt;
