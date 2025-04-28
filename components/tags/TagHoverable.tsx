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
  tag: TypeTagMas | null;
  type: string;
  isSelected?: boolean;
  handelRemove?: (tag: TypeTagMas) => void;
  afterIconType?: string;
  tagName?: string;
  tooltipName?: string;
  tooltipDescription?: string;
  addpreSharp?: boolean;
}

const TagHoverable: React.FC<HoverableBadgeProps> = ({
  tag,
  type,
  isSelected = false, // ★ デフォルト値を false に設定
  handelRemove,
  afterIconType,
  tagName = "",
  tooltipName = "",
  tooltipDescription = "",
  addpreSharp = true,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const colorMap: { [key: string]: string } = {
    fav: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-sm",
    sel: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-sm",
    nor: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-sm",
  };

  const baseClassName = "my-1 mx-0.5 rounded-full cursor-pointer";
  const colorClassName = colorMap[type] || "border-gray-500";
  const selectedClassName = isSelected ? "ring-2 ring-ring " : "";
  const hoverClassName = "opacity-75"; // マウスオーバー時のスタイル例 (透明度を下げる)
  // 他にも、背景色や文字色を変更するクラスを追加できます
  const badgeClassName = `${baseClassName} ${colorClassName} ${selectedClassName} ${
    isHovering ? hoverClassName : ""
  }`;
  const badgeKey = tag !== null ? tag.id : tagName;
  const badgeTagName =
    (addpreSharp ? "#" : "") + (tag !== null ? tag.tag_name : tagName);
  const badgeTooltipName = tag !== null ? tag.name : tooltipName;
  const badgeTooltipDescription =
    tag !== null ? tag.description : tooltipDescription;

  // クリックハンドラーを定義
  const handleClick = () => {
    // tag と handelRemove の両方が存在する場合のみ handelRemove を呼び出す
    if (tag && handelRemove) {
      handelRemove(tag);
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div style={{ display: "inline-block" }}>
              <Badge
                variant="outline"
                key={badgeKey} // key はここで指定
                className={badgeClassName}
                onClick={handleClick}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {badgeTagName}
                {afterIconType === "plus" ? (
                  <PlusIcon className="h-4 w-4" />
                ) : afterIconType === "minus" ? (
                  <MinusIcon className="h-4 w-4" />
                ) : null}
              </Badge>
            </div>
          </TooltipTrigger>

          <TooltipContent>
            {badgeTooltipName}
            {badgeTooltipDescription && (
              <div className="text-sm　text-gray-600 dark:text-gray-400">
                {badgeTooltipDescription}
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default TagHoverable;
