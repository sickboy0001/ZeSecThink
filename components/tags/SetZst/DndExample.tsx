"use client";
import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import LeftColumn from "@/components/tags/SetZst/LeftColumn";
import RightColumn from "@/components/tags/SetZst/RightColumn";
import DragOverlayItem from "@/components/tags/SetZst/DragOverlayItem";
import { Item } from "@/app/types/item";

const DndExample: React.FC = () => {
  const [leftItems, setLeftItems] = useState<Item[]>([
    { id: "left-1", name: "Left Item 1" },
    { id: "left-2", name: "Left Item 2" },
  ]);
  const [rightItems, setRightItems] = useState<Item[]>([
    { id: "right-1", name: "Right Item 1" },
    { id: "right-2", name: "Right Item 2" },
    { id: "right-3", name: "Right Item 3" },
  ]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeItem =
    rightItems.find((item) => item.id === activeId) ||
    leftItems.find((item) => item.id === activeId) ||
    null;

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: DragStartEvent) => {
    // setActiveId(event.active.id);
    setActiveId(String(event.active.id)); // 明示的に string に変換
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    console.log(active, over);

    if (!active || !over || active.id === over.id) {
      console.log(active, over, active.id);
      return;
    }

    const activeItemData =
      rightItems.find((item) => item.id === active.id) ||
      leftItems.find((item) => item.id === active.id);

    if (!activeItemData) {
      return;
    }

    // 右から左へのドロップ
    if (
      over.id === "left-column" &&
      rightItems.some((item) => item.id === active.id)
    ) {
      setRightItems((prev) => prev.filter((item) => item.id !== active.id));
      setLeftItems((prev) => [...prev, activeItemData]);
    }
    // 左から右へのドロップ (必要に応じて実装)
    else if (
      over.id === "right-column" &&
      leftItems.some((item) => item.id === active.id)
    ) {
      setLeftItems((prev) => prev.filter((item) => item.id !== active.id));
      setRightItems((prev) => [...prev, activeItemData]);
    }
    // 同じカラム内での並び替え (Left Column)
    else if (
      over.id === "left-column" &&
      leftItems.some((item) => item.id === active.id)
    ) {
      const oldIndex = leftItems.findIndex((item) => item.id === active.id);
      const newIndex = leftItems.findIndex((item) => item.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setLeftItems(arrayMove(leftItems, oldIndex, newIndex));
      }
    }
    // 同じカラム内での並び替え (Right Column)
    else if (
      over.id === "right-column" &&
      rightItems.some((item) => item.id === active.id)
    ) {
      const oldIndex = rightItems.findIndex((item) => item.id === active.id);
      const newIndex = rightItems.findIndex((item) => item.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        setRightItems(arrayMove(rightItems, oldIndex, newIndex));
      }
    }
  };

  return (
    <div className="flex p-4 space-x-4">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <LeftColumn items={leftItems} />
        <RightColumn items={rightItems} />
        <DragOverlay>
          <DragOverlayItem item={activeItem} />
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default DndExample;
