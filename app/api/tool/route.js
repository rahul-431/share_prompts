import { connectDB } from "@/utils/db";
import Tool from "@models/tool";
export const GET = async (req) => {
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
        $unwind: "$creator",
      },
      {
        $match: {
          $or: [
            { title: { $regex: searchValue, $options: "i" } },
            { features: { $regex: searchValue, $options: "i" } },
            { "creator.name": { $regex: searchValue, $options: "i" } },
          ],
        },
      },

      {
        $sort: { createdAt: -1 },
      },
    ];
    const tools = await Tool.aggregate(pipeline).exec();
    return new Response(JSON.stringify(tools), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all Prompts", { status: 500 });
  }
};
