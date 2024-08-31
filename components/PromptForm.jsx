import Link from "next/link";
const PromptForm = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <div className="w-full max-w-2xl  flex flex-col gap-2">
      {type !== "Create" && (
        <h1 className="head_text blue_gradient">Update Prompt</h1>
      )}
      <form
        className="my-10 flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Title
          </span>
          <input
            value={post.title}
            placeholder="Write prompt title..."
            required
            className="form_input"
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          ></input>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            AI Prompt
          </span>
          <textarea
            value={post.prompt}
            placeholder="Write prompt here..."
            required
            className="form_textarea"
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#Product, #Web Development, #Idea)
            </span>
          </span>
          <input
            value={post.tag}
            placeholder="Tags...."
            required
            className="form_input"
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            AI Tools{" "}
            <span className="font-normal">
              (#Chatgpt, #GoogleBard, #Midjourney)
            </span>
          </span>
          <input
            value={post.tools}
            placeholder="Tags...."
            required
            className="form_input"
            onChange={(e) => setPost({ ...post, tools: e.target.value })}
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            href={type === "Create" ? "/create_post" : "/profile"}
            className="text-gray-500 "
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-1.5  bg-primary-orange text-white rounded-full"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptForm;
