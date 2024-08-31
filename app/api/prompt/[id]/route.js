import { connectDB } from "@/utils/db";
import Prompt from "@/models/prompt";

//get(read)
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const post = await Prompt.findById(params.id).populate("creator");
    if (!post) return new Response("Prompt is not found", { status: 404 });
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch Prompt", { status: 500 });
  }
};

//patch (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag, tools, title } = await req.json();
  try {
    await connectDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    existingPrompt.tools = tools;
    existingPrompt.title = title;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update prompt", { status: 500 });
  }
};
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt Deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
