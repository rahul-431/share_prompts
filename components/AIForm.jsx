import Link from "next/link";
const AIForm = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <div className="w-full max-w-2xl  flex flex-col gap-2">
      {type !== "Create" && (
        <h1 className="head_text blue_gradient">Update AI Tool</h1>
      )}
      <form
        className="my-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-satoshi font-semibold  text-gray-700">
            Title
          </span>
          <input
            value={post.title}
            placeholder="title..."
            required
            className="form_input"
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold  text-gray-700">
            Features
          </span>
          <textarea
            value={post.features}
            placeholder="Write Features here..."
            required
            className="form_textarea"
            onChange={(e) => setPost({ ...post, features: e.target.value })}
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold  text-gray-700">
            Link
          </span>
          <input
            value={post.link}
            placeholder="http://......"
            className="form_input"
            onChange={(e) => setPost({ ...post, link: e.target.value })}
          />
        </label>
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={post.isFree}
            className="w-6 h-6 block"
            onChange={(e) => {
              setPost({ ...post, isFree: e.target.checked });
            }}
          />
          <p className="font-satoshi font-semibold  text-gray-700">Is Free</p>
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
            className="px-5 py-1.5 bg-primary-orange text-white rounded-full"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIForm;
