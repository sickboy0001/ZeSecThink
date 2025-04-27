"use client";

import React, { useId, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import {
  Pencil2Icon,
  DragHandleDots2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
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
  sortedAction: boolean;
  remakeSort: (tag: TypeTagMas) => void;
  handleDelete: (id: number) => void;
};

const TagSortableItem = (props: SortableItemProps) => {
  const { tagMas, sortedAction, remakeSort, handleDelete } = props;
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
  const [deleteOpen, setDeleteOpen] = useState(false); // 削除確認ダイアログの状態
  const draggable_item_description_id = useId();
  const describedBy = `draggable-item-description-${draggable_item_description_id}`;
  const confirmDelete = () => {
    handleDelete(Number(nowTag.id)); // 削除処理を実行
    setDeleteOpen(false); // 確認ダイアログを閉じる
  };
  const handleTagUpdated = (updatedTag: TypeTagMas) => {
    setNowTag(updatedTag);
    remakeSort(updatedTag);
    setOpen(false); // モーダルを閉じる
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center px-3 py-1 m-2  border border-gray-300 rounded  bg-white shadow"
    >
      {/* ドラッグハンドル */}
      {sortedAction ? (
        <span
          {...attributes}
          {...listeners}
          aria-describedby={describedBy}
          className="mr-3 cursor-grab text-gray-500 hover:text-gray-700"
        >
          <DragHandleDots2Icon className="h-5 w-5"></DragHandleDots2Icon>
        </span>
      ) : null}
      {/* 表示用のテキスト */}
      <span
        className={nowTag.visible_flg ? "" : "line-through"}
        style={{
          textDecorationThickness: nowTag.visible_flg ? undefined : "3px",
        }}
      >
        {`#${nowTag.tag_name}`}
        {` - ${nowTag.name}`}
      </span>
      <div id={describedBy} className="sr-only">
        {nowTag.name} をドラッグして移動できます。
      </div>
      {/* dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="mx-1">
          <Button variant="outline" size="icon" className="p-1">
            <Pencil2Icon className="h-5 w-5" />
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

      {/* 削除確認ダイアログ */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        {/* 削除ボタン (確認ダイアログを開く) */}
        <DialogTrigger asChild className="mx-1">
          <Button variant="destructive" size="icon" className="p-1">
            <TrashIcon className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>削除の確認</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>本当にこのタグを削除しますか？</p>
            <p className="text-sm text-gray-500">削除すると元に戻せません。</p>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteOpen(false)}>
              キャンセル
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              削除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TagSortableItem;
