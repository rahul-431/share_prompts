"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/AIForm";
import toast from "react-hot-toast";

const AddAITool = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    features: "",
    link: "",
    isFree: false,
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
      const response = await fetch(`/api/tool/new`, {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          features: post.features,
          link: post.link,
          isFree: post.isFree,
          userId: session?.user.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 409) {
        toast.error(`${post.title} is already exist you can add new tools.`);
        router.push("/create_post");
      }
      if (response.ok) {
        router.push("/");
        toast.success("AI tool added successfully");
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
        <p className="text-2xl font-bold">AI Tool</p>
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

export default AddAITool;
