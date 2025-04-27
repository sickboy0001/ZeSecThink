import { TypeTagMas } from "@/app/types/tagTypes";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface HoverableBadgeProps {
  tag: TypeTagMas;
  type: string;
  handelRemove?: (tag: TypeTagMas) => void;
  afterIconType?: string;
}

const TagHoverable: React.FC<HoverableBadgeProps> = ({
  tag,
  type,
  handelRemove,
  afterIconType,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const colorMap: { [key: string]: string } = {
    fav: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 ",
    sel: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 ",
    nor: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 ",
  };

  const baseClassName = "mr-1 rounded-full cursor-pointer";
  const colorClassName = colorMap[type] || "border-gray-500";
  const hoverClassName = "opacity-75"; // マウスオーバー時のスタイル例 (透明度を下げる)
  // 他にも、背景色や文字色を変更するクラスを追加できます
  const badgeClassName = `${baseClassName} ${colorClassName} ${
    isHovering ? hoverClassName : ""
  }`;

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div style={{ display: "inline-block" }}>
              <Badge
                variant="outline"
                key={tag.id} // key はここで指定
                className={badgeClassName}
                onClick={() => handelRemove?.(tag)} // handelRemove が null の可能性を考慮
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                #{tag.tag_name}
                {afterIconType === "plus" ? (
                  <PlusIcon className="h-4 w-4" />
                ) : afterIconType === "minus" ? (
                  <MinusIcon className="h-4 w-4" />
                ) : null}
              </Badge>
            </div>
          </TooltipTrigger>

          <TooltipContent>
            {tag.name}
            {tag.description && (
              <div className="text-sm text-muted-foreground">
                {tag.description}
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TagHoverable;
