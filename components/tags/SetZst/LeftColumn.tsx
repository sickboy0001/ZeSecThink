"use client";

import React from "react";
import { SortableContext } from "@dnd-kit/sortable";
import DraggableItem from "@/components/tags/SetZst/DraggableItem";

import { Item } from "@/app/types/item";

interface LeftColumnProps {
  items: Item[];
}

const LeftColumn: React.FC<LeftColumnProps> = ({ items }) => {
  return (
    <div className="w-64 border rounded p-4">
      <h2 className="font-bold mb-2">Left Column</h2>
      <SortableContext id="left-column" items={items.map((item) => item.id)}>
        {items.map((item) => (
          <DraggableItem key={item.id} item={item} />
        ))}
      </SortableContext>
    </div>
  );
};

export default LeftColumn;
