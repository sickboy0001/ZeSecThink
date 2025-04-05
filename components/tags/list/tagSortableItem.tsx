"use client";

import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSortable } from "@dnd-kit/sortable";
import { TypeTagMas } from "@/app/types/tagTypes";
import ModalEdit from "./modalEdit";

type SortableItemProps = {
  tagMas: TypeTagMas;
};

const TagSortableItem = ({ tagMas }: SortableItemProps) => {
  const { id, tagName, name } = tagMas;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const [showEdit, setShowEdit] = useState(false);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center p-3 border border-gray-300 rounded mb-2 bg-white shadow"
    >
      {/* ドラッグハンドル */}
      <span
        {...attributes}
        {...listeners}
        className="mr-3 cursor-grab text-gray-500 hover:text-gray-700"
      >
        ≡
      </span>
      {/* 表示用のテキスト */}
      <span>{`#${tagName} - ${name}`}</span>
      {/* dialog */}
      <Dialog>
        <DialogTrigger asChild className="mx-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowEdit(true)}
          >
            <Pencil2Icon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        {showEdit ? (
          <DialogContent
            className="sm:max-w-md"
            aria-labelledby="dialog-title" // DialogTitle に ID を追加
            aria-describedby="dialog-description" // 説明部分に ID を追加
            role="dialog" // role 属性を明示的に設定
          >
            <DialogHeader>
              <DialogTitle id="dialog-title" className="text-left">
                Edit{" "}
              </DialogTitle>
            </DialogHeader>
            <div>
              <p id="dialog-description" className="sr-only">
                このダイアログではアイテムの編集ができます。
              </p>
              <ModalEdit showModal={setShowEdit} tagMas={tagMas}></ModalEdit>
            </div>
            <DialogFooter className="sm:justify-start"></DialogFooter>
          </DialogContent>
        ) : null}
      </Dialog>
    </div>
  );
};

export default TagSortableItem;
