import { connectDB } from "@/utils/db";
import Tool from "@models/tool";
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const tools = await Tool.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(tools), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all Prompts", { status: 500 });
  }
};
