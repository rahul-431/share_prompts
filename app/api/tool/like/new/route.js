import { connectDB } from "@/utils/db";
import ToolLike from "@models/toolLike";
export const POST = async (req) => {
  const { userId, toolId } = await req.json();
  try {
    await connectDB();
    const newToolLike = new ToolLike({
      userId,
      toolId,
    });
    await newToolLike.save();
    return new Response(JSON.stringify(newToolLike), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to create new ToolLike",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
