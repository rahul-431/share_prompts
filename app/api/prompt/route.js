import { connectDB } from "@/utils/db";
import Prompt from "@/models/prompt";
export const GET = async (req, {}) => {
  const { searchParams } = new URL(req.url);
  const searchValue = searchParams.get("search")
    ? searchParams.get("search")
    : "";
  try {
    await connectDB();
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$creator", // Unwind the creatorDetails array to get a single object
      },
      {
        $match: {
          $or: [
            { title: { $regex: searchValue, $options: "i" } },
            { prompt: { $regex: searchValue, $options: "i" } },
            { tag: { $regex: searchValue, $options: "i" } },
            { tools: { $regex: searchValue, $options: "i" } },
            { "creator.name": { $regex: searchValue, $options: "i" } },
          ],
        },
      },

      {
        $sort: { createdAt: -1 },
      },
    ];
    const posts = await Prompt.aggregate(pipeline).exec();
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all Prompts", { status: 500 });
  }
};
