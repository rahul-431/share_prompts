import { connectDB } from "@/utils/db";
import PromptLike from "@models/promptLike";
export const POST = async (req) => {
  const { userId, promptId } = await req.json();
  try {
    await connectDB();
    const newPromptLike = new PromptLike({
      userId,
      promptId,
    });
    await newPromptLike.save();
    return new Response(JSON.stringify(newPromptLike), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to create new PromptLike",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
