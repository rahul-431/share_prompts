"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/AIForm";
import toast from "react-hot-toast";

const EditTool = () => {
  const searchParams = useSearchParams();
  const toolId = searchParams.get("id");
  const [submitting, setSubmitting] = useState(false);
  const [tool, setTool] = useState({
    title: "",
    features: "",
    link: "",
    isFree: false,
  });
  useEffect(() => {
    const getTool = async () => {
      const res = await fetch(`/api/tool/${toolId}`);
      const data = await res.json();

      setTool(data);
    };
    if (toolId) getTool();
  }, [toolId]);
  const router = useRouter();
  const editTool = async (e) => {
    e.preventDefault();

    if (!toolId) return toast.error("No Prompt Id provided");
    setSubmitting(true);
    try {
      const response = await fetch(`/api/tool/${toolId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: tool.title,
          features: tool.features,
          link: tool.link,
          isFree: tool.isFree,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push("/profile");
        toast.success("AI tool updated successfully");
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
    <Suspense fallback={<p>Loading....</p>}>
      <Form
        type="Update"
        post={tool}
        setPost={setTool}
        submitting={submitting}
        handleSubmit={editTool}
      />
    </Suspense>
  );
};

export default EditTool;
