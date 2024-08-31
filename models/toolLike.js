import { Schema, model, models } from "mongoose";
const likeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  toolId: {
    type: Schema.Types.ObjectId,
    ref: "Tool",
  },
});
const ToolLike = models.ToolLike || model("ToolLike", likeSchema);
export default ToolLike;
