import ToolLike from "@models/toolLike";
import { connectDB } from "@utils/db";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    if (!params.id) {
      return new Response("Tool Id is required", { status: 400 });
    }
    const like = await ToolLike.find({
      toolId: params.id,
    });
    if (!like) return new Response("ToolLike is not found", { status: 404 });
    return new Response(JSON.stringify(like), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch ToolLike", { status: 500 });
  }
};
