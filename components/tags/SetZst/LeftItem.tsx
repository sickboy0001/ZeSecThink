"use client";
import React, { useState } from "react";
import { Tag } from "@/app/types/item"; // タグの型定義

interface LeftItemProps {
  item: { id: string; name: string }; // 左側の項目のデータ型
  onTagAttached: (itemId: string, tag: Tag) => void; // タグが紐付けられた際のコールバック
  attachedTags: Tag[]; // 現在紐付けられているタグのリスト
}

const LeftItem: React.FC<LeftItemProps> = ({
  item,
  onTagAttached,
  attachedTags,
}) => {
  return (
    <div className="border rounded p-4 mb-2 bg-gray-100 shadow-sm">
      <h3 className="font-bold">{item.name}</h3>
      <p className="text-sm text-gray-500">ID: {item.id}</p>
      {attachedTags.length > 0 && (
        <div className="mt-2">
          <span className="font-semibold">Attached Tags:</span>
          {attachedTags.map((tag) => (
            <span
              key={tag.id}
              className="inline-block bg-blue-200 text-blue-700 rounded-full px-2 py-1 text-xs mr-1"
            >
              {tag.content}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeftItem;
