"use client";
import React from "react";
import { Tag } from "@/app/types/item"; // タグの型定義

interface RightTagProps {
  tag: Tag;
  onTagClick: (tag: Tag) => void; // タグがクリックされた際のコールバック
}

const RightTag: React.FC<RightTagProps> = ({ tag, onTagClick }) => {
  return (
    <button
      onClick={() => onTagClick(tag)}
      className="inline-block bg-green-200 text-green-700 rounded-full px-3 py-1 text-sm mr-2 mb-2 hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      {tag.content}
    </button>
  );
};

export default RightTag;
