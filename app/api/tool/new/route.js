import { connectDB } from "@/utils/db";
import Tool from "@models/tool";
export const POST = async (req) => {
  const { userId, title, features, link, isFree } = await req.json();
  try {
    await connectDB();
    // console.log(userId);
    const newTool = new Tool({
      creator: userId,
      title,
      features,
      link,
      isFree,
    });
    const isExist = await Tool.findOne({ title: title });
    if (isExist)
      return new Response("This Ai tool is already exist", { status: 409 });
    await newTool.save();
    return new Response(JSON.stringify(newTool), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed to add new ai tool",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
