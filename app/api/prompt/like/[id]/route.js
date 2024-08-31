import PromptLike from "@models/promptLike";
import { connectDB } from "@utils/db";

export const GET = async (req, { params }) => {
  try {
    await connectDB();
    if (!params.id) {
      return new Response("Prompt ID is required", { status: 400 });
    }
    const like = await PromptLike.find({
      promptId: params.id,
    });
    if (!like) return new Response("PromptLike is not found", { status: 404 });
    return new Response(JSON.stringify(like), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch PromptLike", { status: 500 });
  }
};
