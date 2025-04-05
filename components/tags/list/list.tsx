"use client";

import React, { useState } from "react";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TypeTagMas } from "@/app/types/tagTypes";
import ModalEdit from "./modalEdit";
import TagSortableItem from "./tagSortableItem";

const getItems = (): TypeTagMas[] => [
  {
    id: "10",
    tagName: "Notion",
    name: "Notionについて",
    description: "",
    visible_flg: true,
    favorite_flg: true,
  },
  {
    id: "101",
    tagName: "Work",
    name: "",
    description: "",
    visible_flg: true,
    favorite_flg: true,
  },
  {
    id: "103",
    tagName: "言語化",
    name: "",
    description: "",
    visible_flg: true,
    favorite_flg: true,
  },
  {
    id: "11",
    tagName: "ZSTA",
    name: "ゼロ秒思考アプリ",
    description: "",
    visible_flg: true,
    favorite_flg: true,
  },
  {
    id: "12",
    tagName: "ZSTA_REQ",
    name: "ZSTA機能追加要望",
    description: "",
    visible_flg: true,
    favorite_flg: true,
  },
  {
    id: "13",
    tagName: "ZSTA_TAG",
    name: "ZSTATag機能",
    description: "",
    visible_flg: true,
    favorite_flg: true,
  },
  {
    id: "14",
    tagName: "ZSTA_ZET",
    name: "ZSTAツェッテルカルツエン",
    description: "",
    visible_flg: true,
    favorite_flg: true,
  },
];

// const getItems = () => ["Apple", "Banana", "Cherry"];

const List = () => {
  const [items, setItems] = useState(getItems());

  // 編集中のアイテム情報
  const [editingItem, setEditingItem] = useState<{
    id: string;
    name: string;
  } | null>(null);

  // 編集フォームの状態
  const [newName, setNewName] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 少し動かしてから反応
      },
    }),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    setItems(arrayMove(items, oldIndex, newIndex));
  };

  // 編集ボタンが押された時の処理
  const handleEditClick = (item: { id: string; name: string }) => {
    setEditingItem(item); // 編集中のアイテムをセット
    setNewName(item.name); // 編集する名前をセット
  };

  // 編集内容を保存する処理
  const handleSave = () => {
    if (editingItem) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editingItem.id ? { ...item, name: newName } : item,
        ),
      );
    }
    setEditingItem(null); // 編集を終了
    setNewName(""); // フォームをリセット
  };

  // 編集キャンセル
  const handleCancel = () => {
    setEditingItem(null); // 編集を終了
    setNewName(""); // フォームをリセット
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2 style={{ fontWeight: "bold", marginBottom: "16px" }}>
        並べ替えリスト
      </h2>
      <h3>ソート順：{items.map((item) => item.id).join(",")}</h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {/* アイテムリスト */}
          {items.map((item) => (
            <TagSortableItem key={item.id} tagMas={item} />
          ))}
        </SortableContext>
      </DndContext>

      {/* アイテムリスト */}
      <div className="p-4"></div>
    </div>
  );
};

export default List;
