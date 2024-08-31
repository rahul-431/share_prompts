import { connectDB } from "@/utils/db";
import Prompt from "@/models/prompt";
export const GET = async (req, { params}) => {
  try {
    await connectDB();
      const posts = await Prompt.find({creator:params.id}).populate("creator");
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response(
      "Failed to fetch all Prompts",
      { status: 500 }
    );
  }
};
