import { connectDB } from "@/utils/db";
import Prompt from "@/models/prompt";
export const POST = async (req) => {
  const { userId, prompt, title, tag, tools } = await req.json();
  try {
    await connectDB();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
      title,
      tools,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to create new Prompt",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
