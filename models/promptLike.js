import { Schema, model, models } from "mongoose";
const likeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  promptId: {
    type: Schema.Types.ObjectId,
    ref: "Prompt",
  },
});
const PromptLike = models.PromptLike || model("PromptLike", likeSchema);
export default PromptLike;
