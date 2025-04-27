"use client";
import React, { useState } from "react";
import { Item as LeftItemData, Tag } from "@/app/types/item";
import LeftItem from "./LeftItem";
import RightTag from "./RightTag";

const TagLinkingPage: React.FC = () => {
  const [leftItems, setLeftItems] = useState<LeftItemData[]>([
    { id: "item-1", name: "項目 A" },
    { id: "item-2", name: "項目 B" },
    { id: "item-3", name: "項目 C" },
  ]);
  const [rightTags, setRightTags] = useState<Tag[]>([
    { id: "tag-1", content: "重要" },
    { id: "tag-2", content: "緊急" },
    { id: "tag-3", content: "高" },
    { id: "tag-4", content: "中" },
    { id: "tag-5", content: "低" },
  ]);
  const [itemTags, setItemTags] = useState<{ [itemId: string]: Tag[] }>({});

  const handleTagClick = (tag: Tag) => {
    // ここでどの左側の項目に紐付けるかのロジックが必要になります。
    // 例えば、現在選択されている項目がある場合など。
    // 簡単な例として、常に最初の項目に紐付けるとします。
    if (leftItems.length > 0) {
      const firstItemId = leftItems[0].id;
      setItemTags((prev) => ({
        ...prev,
        [firstItemId]: [...(prev[firstItemId] || []), tag],
      }));
    } else {
      alert("紐付ける項目がありません。");
    }
  };

  const handleTagAttached = (itemId: string, tag: Tag) => {
    setItemTags((prev) => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), tag],
    }));
  };

  return (
    <div className="flex p-4 space-x-4">
      <div className="w-64">
        <h2 className="font-bold mb-4">項目</h2>
        {leftItems.map((item) => (
          <LeftItem
            key={item.id}
            item={item}
            onTagAttached={handleTagAttached}
            attachedTags={itemTags[item.id] || []}
          />
        ))}
      </div>
      <div className="w-64">
        <h2 className="font-bold mb-4">タグ</h2>
        <div className="flex flex-wrap">
          {rightTags.map((tag) => (
            <RightTag key={tag.id} tag={tag} onTagClick={handleTagClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagLinkingPage;
