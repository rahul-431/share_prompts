"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/PromptForm";
import toast from "react-hot-toast";

const EditPrompt = () => {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  console.log(promptId);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
    title: "",
    tools: "",
  });
  useEffect(() => {
    const getPrompt = async () => {
      const res = await fetch(`/api/prompt/${promptId}`);
      const data = await res.json();

      setPost(data);
    };
    if (promptId) getPrompt();
  }, [promptId]);
  const router = useRouter();
  const editPrompt = async (e) => {
    e.preventDefault();

    if (!promptId) return toast.error("Prompt id required");
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          title: post.title,
          tools: post.tools,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push("/profile");
        toast.success("Prompt updated successfully");
      }
    } catch (error) {
      router.push("/profile");
      toast.error("Failed to update. Please try again");
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Form
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPrompt}
      />
    </Suspense>
  );
};

export default EditPrompt;
