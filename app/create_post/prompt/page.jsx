"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/PromptForm";
import toast from "react-hot-toast";

const CreateNewPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    prompt: "",
    tag: "",
    tools: "",
  });
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) router.push("/");
  }, []);
  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/new`, {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          title: post.title,
          tools: post.tools,
          userId: session?.user.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push("/");
        toast.success("Prompt added successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col w-full max-w-2xl mt-5">
      <div className="flex justify-between w-full">
        <p className="text-2xl font-bold">Prompt</p>
        <button
          className="bg-black rounded-full px-4 py-1 text-white flex justify-end"
          onClick={() => {
            router.push("/create_post");
          }}
        >
          Go Back
        </button>
      </div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </div>
  );
};

export default CreateNewPrompt;
