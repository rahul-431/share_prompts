import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col gap-5 mt-6">
      <h1 className="text-2xl font-normal">What you want to post about?</h1>
      <div className="flex gap-5">
        <Link
          href="/create_post/ai_tool"
          className="bg-black text-white rounded-full py-2 px-4 border border-black hover:bg-white hover:text-black"
        >
          AI Tool
        </Link>
        <Link
          href="/create_post/prompt"
          className="bg-white text-black rounded-full py-2 px-4 border border-black hover:bg-black hover:text-white"
        >
          Prompt
        </Link>
      </div>
    </div>
  );
};

export default page;
