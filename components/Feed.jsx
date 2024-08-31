"use client";

import { useEffect, useState } from "react";
import PromptCardList from "./PromptCardList";
import ToolCardList from "./ToolCardList";
import Image from "next/image";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [tools, setTools] = useState([]);
  useEffect(() => {
    const fetchPrompt = async () => {
      const res = await fetch(`/api/prompt?search=${searchText}`);
      const data = await res.json();
      setPosts(data);
    };
    const fetchTool = async () => {
      const res = await fetch(`/api/tool?search=${searchText}`);
      const data = await res.json();
      setTools(data);
    };
    fetchPrompt();
    fetchTool();
  }, [searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleTagClick = (value) => {
    setSearchText(value);
  };
  return (
    <section className="feed">
      <div className="relative w-full max-w-xl flex-center">
        <input
          type="text"
          placeholder="Search tag, username or prompts"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input pee"
        />
        <button
          onClick={() => setSearchText("")}
          className="absolute right-4 text-lg px-4 border-s-2 border-gray-200 h-full"
        >
          <Image src="/assets/icons/close.png" height={16} width={16} />
        </button>
      </div>

      {posts.length > 0 ? (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      ) : (
        <p className="my-2 text-left text-lg">No Prompts to show</p>
      )}
      {tools.length > 0 && (
        <ToolCardList data={tools} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
