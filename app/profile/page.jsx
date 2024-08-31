"use client";
import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@/components/Profile";

const MyProfile = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const userId = searchParams.get("id") ? searchParams.get("id") : "";
  const userName = searchParams.get("name") ? searchParams.get("name") : "";
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [tools, setTools] = useState([]);
  useEffect(() => {
    const fetchPrompt = async () => {
      const res = await fetch(
        `/api/users/${userId ? userId : session?.user.id}/posts`
      );
      const data = await res.json();
      setPosts(data);
    };
    if (userId || session?.user.id) fetchPrompt();
    const fetchTool = async () => {
      const res = await fetch(
        `/api/users/${userId ? userId : session?.user.id}/tools`
      );
      const data = await res.json();
      setTools(data);
    };
    if (userId || session?.user.id) fetchTool();
  }, [userId]);
  const handlePromptEdit = (post) => {
    router.push(`/update_prompt?id=${post._id}`);
  };
  const handlePromptDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleToolEdit = (post) => {
    router.push(`/update_tool?id=${post._id}`);
  };
  const handleToolDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/tool/${post._id.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = tools.filter((p) => p._id !== post._id);
        setTools(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Suspense fallback={<p>Loading....</p>}>
      <Profile
        name={userName ? userName : "My"}
        desc="Welcome to your personalized profile page"
        prompts={posts}
        tools={tools}
        handlePromptEdit={handlePromptEdit}
        handlePromptDelete={handlePromptDelete}
        handleToolEdit={handleToolEdit}
        handleToolDelete={handleToolDelete}
      />
    </Suspense>
  );
};

export default MyProfile;
