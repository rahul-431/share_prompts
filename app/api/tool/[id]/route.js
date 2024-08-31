import { connectDB } from "@/utils/db";
import Tool from "@models/tool";

//get(read)
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    const tool = await Tool.findById(params.id).populate("creator");
    if (!tool) return new Response("Tool is not found", { status: 404 });
    return new Response(JSON.stringify(tool), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch Tool", { status: 500 });
  }
};

//patch (update)
export const PATCH = async (req, { params }) => {
  const { title, features, link, isFree } = await req.json();
  console.log(params.id);
  try {
    await connectDB();
    const existingTool = await Tool.findById(params.id);
    if (!existingTool) return new Response("Tool not found", { status: 404 });
    existingTool.title = title;
    existingTool.features = features;
    existingTool.link = link;
    existingTool.isFree = isFree;
    await existingTool.save();
    return new Response(JSON.stringify(existingTool), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update Tool", { status: 500 });
  }
};
export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    await Tool.findByIdAndDelete(params.id);
    return new Response("Tool Deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete Tool", { status: 500 });
  }
};
