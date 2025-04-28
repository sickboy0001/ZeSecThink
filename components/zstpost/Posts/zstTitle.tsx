"use client";

import { TypeZstPostWithTags } from "@/app/types/zstTypes";
import {
  Pencil1Icon,
  LockClosedIcon,
  ClipboardCopyIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import getIncludelLinkHtmlFromText from "@/lib/Html";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ModalZstPostEdit from "../Modal/ModalZstPostEdit";
import TagLink from "./TagLink";
import { TypeTagMas } from "@/app/types/tagTypes";
import { readTagsByPostId } from "@/app/actions/ZstTagLink/ZstTagLink";
import TagBadgeList from "@/components/tags/TagBadgeList";
import { formatDateToMMDDWeekFromDate } from "@/lib/utilsDate";

async function fetchTagsForPost(postId: number) {
  console.log("fetchTagsForPost Start", postId);
  const { data, error } = await readTagsByPostId(postId);
  if (error) {
    console.error("Failed to fetch tags:", error);
    // エラー処理
    return;
  }
  if (data) {
    return data;
  }
}

const copyClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // alert("コピーしました！"); // ユーザーに通知（不要なら削除）
  } catch (err) {
    console.error("クリップボードへのコピーに失敗しました", err);
  }
};

interface propTypes {
  zstPost: TypeZstPostWithTags;
  isDispDetail?: boolean;
  putZstPosts?: (posts: TypeZstPostWithTags, actionType: string) => void;
  children?: React.ReactNode;
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
  titlePreYmd?: boolean;
  visibleTagLink?: boolean;
}
//タイトルの表示
//  クリップボードへのコピー、編集画面へボタン、タグの表示、編集など
const ZstTitle = (props: propTypes) => {
  const {
    zstPost,
    isDispDetail,
    putZstPosts,
    children,
    favoriteTagMass,
    normalTagMass,
    titlePreYmd,
    visibleTagLink = true,
  } = props;
  const itemkey = 0;
  const [nowZstPost, setNowZstPost] = useState<TypeZstPostWithTags>(zstPost);
  const [showEdit, setShowEdit] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);
  const dispword = isDispDetail ? "" : "1";

  const [selectedTagMass, setSelectedTagMass] = useState<TypeTagMas[]>([]);

  useEffect(() => {
    setNowZstPost(zstPost);
  }, [zstPost]);

  useEffect(() => {
    const fetchData = async () => {
      readSelectedTagMass();
    };
    fetchData();
  }, [zstPost.id, zstPost.tagIds, favoriteTagMass, normalTagMass]);

  const readSelectedTagMass = async () => {
    // console.log("readSelectedTagMass", zstPost.tagIds);

    const nowSlectedIds = zstPost.tagIds;

    const allTagMas = [
      ...(Array.isArray(favoriteTagMass) ? favoriteTagMass : []),
      ...(Array.isArray(normalTagMass) ? normalTagMass : []),
    ];

    // console.log(
    //   "readSelectedTagMass.allTagMas",
    //   favoriteTagMass,
    //   normalTagMass,
    //   nowSlectedIds,
    // );

    if (nowSlectedIds && allTagMas.length > 0) {
      const nowSelectedTagMass = allTagMas.filter((tagMas) =>
        nowSlectedIds.includes(Number(tagMas.id)),
      );
      // console.log("readSelectedTagMass.nowSelectedTagMass", nowSelectedTagMass);
      // console.log("nowSelectedTagMass)
      setSelectedTagMass(nowSelectedTagMass);
    }
  };
  const dateInfo = titlePreYmd
    ? formatDateToMMDDWeekFromDate(new Date(zstPost.current_at))
    : { formattedDate: "", weekdayIndex: -1 }; // デフォルト値を設定

  const weekdayColorClass =
    dateInfo.weekdayIndex === 6
      ? "text-blue-500" // 土曜日
      : dateInfo.weekdayIndex === 0
        ? "text-red-500" // 日曜日
        : ""; // 平日は色なし
  // console.log("ZstTitle", visibleTagLink);
  return (
    <div
      className={`py-1 ${zstPost.delete_flg && !isDispDetail ? "hidden" : ""}`}
    >
      <Accordion
        type="single"
        collapsible
        defaultValue={`item-key-${String(itemkey)}}${dispword}`}
      >
        <AccordionItem value={`item-key-${String(itemkey)}}`}>
          <div className="flex">
            <AccordionTrigger className="py-2">
              <div className="flex items-center font-medium leading-none underline text-left ">
                <LockClosedIcon
                  className={`h-5 w-5 text-red-900 ${
                    zstPost.public_flg ? "hidden" : ""
                  }`}
                />
                <p
                  className={`text-lg ${
                    zstPost.delete_flg ? "line-through" : ""
                  }`}
                >
                  <span
                    className={`text-lg ${zstPost.delete_flg ? "line-through" : ""} ${weekdayColorClass}`}
                  >
                    {dateInfo.formattedDate}
                  </span>
                  {dateInfo.formattedDate !== "" ? <span>:</span> : ""}
                  {zstPost.title}
                </p>
              </div>
            </AccordionTrigger>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowEdit(true)}
                >
                  <Pencil1Icon className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              {showEdit ? (
                <DialogContent
                  className="sm:max-w-md"
                  aria-describedby="edit-dialog-description"
                >
                  <DialogHeader>
                    <DialogTitle className="text-left">Edit </DialogTitle>
                    <DialogDescription>
                      投稿内容を編集できます。
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <ModalZstPostEdit
                      showModal={setShowEdit}
                      zstPost={zstPost}
                      putZstPosts={putZstPosts}
                    ></ModalZstPostEdit>
                  </div>
                  <DialogFooter className="sm:justify-start"></DialogFooter>
                </DialogContent>
              ) : null}
            </Dialog>

            {/* tags-mnt */}
            {visibleTagLink ? (
              <TagLink
                zstPost={nowZstPost}
                selectedTagMass={selectedTagMass}
                setSelectedTagMass={setSelectedTagMass}
                favoriteTagMass={favoriteTagMass}
                normalTagMass={normalTagMass}
              ></TagLink>
            ) : (
              ""
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mx-1"
                    onClick={() => copyClipBoard(nowZstPost.title)}
                  >
                    <ClipboardCopyIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>タイトルのコピー</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <AccordionContent>
            {visibleTagLink && selectedTagMass.length > 0 ? (
              <div className="text-sm  flex items-center">
                <TagBadgeList
                  tags={selectedTagMass}
                  type="sel"
                  afterIconType=""
                ></TagBadgeList>
              </div>
            ) : (
              ""
            )}
            {/* todo:add ShortLink Url */}
            <div
              className="text-black text-lg whitespace-pre-wrap break-words relative"
              onClick={() => setShowCopyButton((prev) => !prev)}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: getIncludelLinkHtmlFromText(nowZstPost.content, 30),
                }}
              />
              {showCopyButton && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute bottom-0 right-0 mx-1"
                        onClick={() => copyClipBoard(nowZstPost.content)}
                      >
                        <ClipboardCopyIcon className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>本文のコピー</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>

            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ZstTitle;
