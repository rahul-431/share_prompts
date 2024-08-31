import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";
import ToolCard from "./ToolCard";
const Profile = ({
  name,
  desc,
  prompts,
  tools,
  handlePromptDelete,
  handlePromptEdit,
  handleToolDelete,
  handleToolEdit,
}) => {
  const { data: session } = useSession();
  return (
    <section className="w-full">
      <div className="flex justify-between gap-2 items-start">
        <div>
          <h1 className="head_text text-left">
            <span className="blue_gradient">{name.toUpperCase()} Profile</span>
          </h1>
          <p className="desc text-left">{desc}</p>
        </div>
        {name === "My" && (
          <div className="flex flex-col gap-1 justify-end items-end">
            <h1 className="text-xl font-bold">
              {(session?.user.name).toUpperCase()}
            </h1>
            <p className="text-lg font-medium">{session?.user.email}</p>
          </div>
        )}
      </div>
      <div className="mt-8 prompt_layout">
        {prompts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handlePromptEdit && handlePromptEdit(post)}
            handleDelete={() => handlePromptDelete && handlePromptDelete(post)}
          />
        ))}
      </div>
      <div className="mt-8 prompt_layout">
        {tools.map((post) => (
          <ToolCard
            key={post._id}
            post={post}
            handleEdit={() => handleToolEdit && handleToolEdit(post)}
            handleDelete={() => handleToolDelete && handleToolDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
