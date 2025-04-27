"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TypeTagMas } from "@/app/types/tagTypes";
import TagSortableItem from "./tagSortableItem";

interface TagListProps {
  tagMass: TypeTagMas[];
  setTagMass: React.Dispatch<React.SetStateAction<TypeTagMas[]>>;
  setTagOrder: (newOrder: string) => void;
  remakeSort: (tag: TypeTagMas) => void;
  onTagOrderChange: (newOrder: TypeTagMas[]) => void; // 親に並び替え後の配列を通知
  handleDelete: (id: number) => void;
}

// const getItems = () => ["Apple", "Banana", "Cherry"];

const TagFavList = (props: TagListProps) => {
  const {
    tagMass,
    setTagMass,
    onTagOrderChange,
    setTagOrder,
    remakeSort,
    handleDelete,
  } = props;
  // const [items, setItems] = useState<TypeTagMas[]>(tagMass);
  // 編集中のアイテム情報

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 少し動かしてから反応
      },
    }),
  );
  // console.log("tagMass");
  // console.log(tagMass);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tagMass.findIndex((item) => item.id === active.id);
    const newIndex = tagMass.findIndex((item) => item.id === over.id);
    const newTagMass = arrayMove([...tagMass], oldIndex, newIndex);
    const newOrderString = newTagMass.map((tag) => tag.id).join(",");
    setTagOrder(newOrderString); // 親に順序文字列を通知
    onTagOrderChange(newTagMass); // 親に並び替え後の配列を通知
  };
  // console.log("TagList.tagmass");
  // console.log(tagMass);
  return (
    <div>
      <h2 style={{ fontWeight: "bold", marginBottom: "8px" }}>
        並べ替え・編集
      </h2>
      {/* 
      <h3>ソート順：{tagMass.map((item) => item.id).join(",")}</h3> */}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tagMass} strategy={verticalListSortingStrategy}>
          {/* アイテムリスト */}
          {tagMass.map((item) => (
            <TagSortableItem
              key={item.id}
              tagMas={item}
              sortedAction={true}
              remakeSort={remakeSort}
              handleDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TagFavList;
