"use client";

import React, { useId, useState } from "react";
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
import ModalTagEditForm from "@/components/modal/ModalTagEditForm";
import { Description } from "@radix-ui/react-dialog";

type SortableItemProps = {
  tagMas: TypeTagMas;
};

const TagListItem = ({ tagMas }: SortableItemProps) => {
  const [nowTag, setNowTag] = useState<TypeTagMas>(tagMas); // Dialog の開閉状態を管理する State
  const { id } = tagMas;
  // const { id, tag_name, name } = tagMas;
  // console.log(id, tagName, name);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id }); //tagMas
  const [open, setOpen] = useState(false); // Dialog の開閉状態を管理する State
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const draggable_item_description_id = useId();
  const describedBy = `draggable-item-description-${draggable_item_description_id}`;

  const handleTagUpdated = (updatedTag: TypeTagMas) => {
    setNowTag(updatedTag);

    setOpen(false); // モーダルを閉じる
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
        aria-describedby={describedBy}
        className="mr-3 cursor-grab text-gray-500 hover:text-gray-700"
      >
        ≡
      </span>
      {/* 表示用のテキスト */}

      <span>{`#${nowTag.tag_name} - ${nowTag.name}`}</span>
      <div id={describedBy} className="sr-only">
        {nowTag.name} をドラッグして移動できます。
      </div>
      {/* dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="mx-2">
          <Button variant="outline" size="icon">
            <Pencil2Icon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md" role="dialog">
          <DialogTitle className="text-left">Edit</DialogTitle>
          <Description>
            このダイアログではアイテムの編集ができます。
          </Description>
          <div>
            <ModalTagEditForm
              showModal={setOpen}
              tagMas={tagMas}
              onTagUpdated={handleTagUpdated} // コールバック関数を渡す
            />
          </div>
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TagListItem;
