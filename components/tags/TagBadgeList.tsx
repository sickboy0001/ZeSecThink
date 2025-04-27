"use client";
import { TypeTagMas } from "@/app/types/tagTypes";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { PlusIcon } from "lucide-react";
import { MinusIcon } from "@radix-ui/react-icons";
import TagHoverable from "./TagHoverable";

interface TagsProps {
  tags: TypeTagMas[];
  type: string; // fav nor sel
  handelRemove?: (tag: TypeTagMas) => void;
  afterIconType: string; //plus minus
}

const TagBadgeList = (props: TagsProps) => {
  const { tags, type, handelRemove, afterIconType } = props;

  // 他にも、背景色や文字色を変更するクラスを追加できます

  return (
    <>
      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <TagHoverable
            key={tag.id}
            tag={tag}
            type={type}
            handelRemove={handelRemove}
            afterIconType={afterIconType}
          />
        ))}
      </div>
    </>
  );
};

export default TagBadgeList;
