"use client";

import React from "react";
import { Item } from "@/app/types/item";

interface DragOverlayItemProps {
  item: Item | null;
}

const DragOverlayItem: React.FC<DragOverlayItemProps> = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <div className="border rounded p-2 shadow-md bg-white cursor-grab">
      {item.name}
    </div>
  );
};

export default DragOverlayItem;
