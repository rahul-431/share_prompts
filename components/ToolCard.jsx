"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const ToolCard = ({ post, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const handleLike = async () => {
    if (!session) {
      toast.error("Please sign in to like post.");
    } else {
      try {
        const res = await fetch("/api/tool/like/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: session?.user.id,
            toolId: post._id,
          }),
        });
        if (res.ok) {
          setLiked(true);
          toast.success("Prompt Liked");
        }
      } catch (error) {
        console.log(error, "Error while like");
      }
    }
  };
  useEffect(() => {
    const getLikes = async () => {
      try {
        const res = await fetch(`/api/tool/like/${post._id}`);
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
        <h1 className="text-lg font-bold">AI Tool</h1>
        {post.isFree ? (
          <p className="bg-blue-500 text-white px-2 py-1 rounded-md">Free</p>
        ) : (
          <p className="bg-orange-500 text-white p-1 px-2 rounded-md">Paid</p>
        )}
      </div>
      <Link
        href={post.link}
        target="_blank"
        className="blue_gradient cursor-pointer text-xl"
      >
        {post.title}
      </Link>
      <p className=" text-gray-700 my-4 text-base">#{post.features}</p>

      <div className="flex justify-between items-center mt-8">
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
            <h3 className="font-semibold text-gray-900 text-base">
              @{post.creator.name}
            </h3>
            <p className=" text-gray-500">{post.creator.email}</p>
          </div>
        </div>
        <div className="flex flex-col text-base justify-end items-end font-semibold gap-1">
          <p className="font-semibold text-sm">
            {formatDistanceToNow(new Date(post.createdAt), {
              addSuffix: false,
            })}
          </p>
          <div
            className="flex items-center justify-between gap-3
           border-2 border-gray-300 py-1 px-2 rounded-xl"
          >
            <button onClick={handleLike} disabled={liked}>
              <Image
                alt="like"
                src={
                  liked ? "/assets/icons/likea.svg" : "/assets/icons/likeb.svg"
                }
                width={18}
                height={18}
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

export default ToolCard;
