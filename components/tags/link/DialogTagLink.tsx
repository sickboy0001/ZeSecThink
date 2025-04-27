"use client";

import React, { useId, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TypeTagMas } from "@/app/types/tagTypes";
import { Description } from "@radix-ui/react-dialog";
import ModalTagSelect from "@/components/modal/ModalTagSelect";
import { FrameIcon } from "@radix-ui/react-icons";

interface DialogTagSeletProps {
  post_id: number;
  post_title: string;
  selectedTagMass: TypeTagMas[];
  setSelectedTagMass: (newTags: TypeTagMas[]) => void;
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
}

const DialogTagLink = (prop: DialogTagSeletProps) => {
  const {
    post_id,
    post_title,
    selectedTagMass,
    setSelectedTagMass,
    favoriteTagMass,
    normalTagMass,
  } = prop;

  const [open, setOpen] = useState(false); // Dialog の開閉状態を管理する State

  const handleTagSelectedUpdated = (updatedTag: TypeTagMas) => {
    setOpen(false); // モーダルを閉じる
  };
  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="">
          <Button variant="outline" size="icon" className="text-sm">
            <FrameIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md" role="dialog">
          <DialogTitle className="text-left">TagLink</DialogTitle>
          <Description>
            {post_title != "" ? `「${post_title}」の` : ""}
            タグを選択します。
          </Description>
          <div>
            <ModalTagSelect
              post_id={post_id}
              selectedTagMass={selectedTagMass}
              setSelectedTagMass={setSelectedTagMass}
              favoriteTagMass={favoriteTagMass}
              normalTagMass={normalTagMass}
              showModal={setOpen}
              onTagUpdated={handleTagSelectedUpdated} // コールバック関数を渡す
              // tagMas={tagMas}
            />
          </div>
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogTagLink;
