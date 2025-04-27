"use client";
import React, { useId } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Item } from "@/app/types/item";

interface DraggableItemProps {
  item: Item;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const id = useId();
  const describedBy = `draggable-item-description-${id}`;

  const style: React.CSSProperties = {
    // transform: CSS.transform(transform),
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      aria-describedby={describedBy}
      className="border rounded p-2 mb-2 bg-white shadow-sm cursor-grab"
    >
      {item.name}
      <div id={describedBy} className="sr-only">
        {item.name} をドラッグして移動できます。
      </div>
    </div>
  );
};

export default DraggableItem;
