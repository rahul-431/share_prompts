"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const pathname = usePathname();
  const router = useRouter();
  const handleCopy = () => {
    setCopied(post.prompt);
    toast.success("Prompt copied.");
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleLike = async () => {
    if (!session) {
      toast.error("Please sign in to like post.");
    } else {
      try {
        const res = await fetch("/api/prompt/like/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user.id,
            promptId: post._id,
          }),
        });
        if (res.ok) {
          setLiked(true);
          toast.success("Post Liked");
        }
      } catch (error) {
        console.log(error, "Error while like");
      }
    }
  };
  useEffect(() => {
    const getLikes = async () => {
      try {
        const res = await fetch(`/api/prompt/like/${post._id}`);
        if (res.status === 404) {
          setLikes([]);
        }
        const data = await res.json();
        const isLiked = data.some((item) => item.userId === session?.user.id);
        setLiked(isLiked);
        setLikes(data);
      } catch (error) {
        console.log(error);
      }
    };
    getLikes();
  }, []);
  return (
    <div className="prompt_card shadow-md shadow-orange-200">
      <div className="flex justify-between items-start gap-14">
        <h1 className="text-lg font-bold">Prompt</h1>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            alt="copy"
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={24}
            height={24}
          />
        </div>
      </div>
      <p className="text-orange-500 mt-2 text-xl font-normal">{post.title}</p>
      <p className=" text-gray-700 my-4 text-wrap text-lg">{post.prompt}</p>
      <p
        className="blue_gradient cursor-pointer text-lg"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {post.tools && (
        <p
          className="flex gap-2 text-lg"
          onClick={() => handleTagClick && handleTagClick(post.tools)}
        >
          <span>Tools : </span>
          <span className="blue_gradient cursor-pointer">{post.tools}</span>
        </p>
      )}
      <div className="flex justify-between items-center mt-4">
        <div
          className="flex flex-1 justify-start items-center gap-3 cursor-pointer"
          onClick={() => {
            router.push(
              `/profile?id=${post.creator._id}&name=${post.creator.name}`
            );
          }}
        >
          {post.creator.image && (
            <Image
              src={post.creator.image ? post.creator.image : ""}
              alt="user Image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          )}
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 text-lg">
              @{post.creator.name}
            </h3>
            <p className=" text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        <div className="flex flex-col text-base justify-end items-end font-semibold gap-1">
          <p className="font-semibold text-base">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </p>
          <div
            className="flex items-start gap-3
           border-2 border-gray-300 py-1 px-2 rounded-xl"
          >
            <button onClick={handleLike} disabled={liked}>
              <Image
                alt="like"
                src={
                  liked ? "/assets/icons/likea.svg" : "/assets/icons/likeb.svg"
                }
                width={22}
                height={22}
              />
            </button>
            <p>{likes?.length}</p>
          </div>
        </div>
      </div>
      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <div className="flex justify-end gap-2 items-center mt-4 pt-3 border-t border-gray-200">
          <p
            className="font-inter  green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter  orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
