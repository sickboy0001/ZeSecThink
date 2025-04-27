"use client";

import { TypeZstPost } from "@/app/types/zstTypes";
import {
  Pencil1Icon,
  LockClosedIcon,
  ClipboardCopyIcon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";
import ZstModalEdit from "./zstModalEdit";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
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

interface propTypes {
  zstPost: TypeZstPost;
  isDispDetail?: boolean;
  children?: React.ReactNode;
}

const ZstTitle = (props: propTypes) => {
  const { zstPost, isDispDetail, children } = props;
  const itemkey = 0;
  const [showEdit, setShowEdit] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);
  const dispword = isDispDetail ? "" : "1";

  const copyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // alert("コピーしました！"); // ユーザーに通知（不要なら削除）
    } catch (err) {
      console.error("クリップボードへのコピーに失敗しました", err);
    }
  };

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
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-left">Edit </DialogTitle>
                  </DialogHeader>
                  <div className="">
                    <ZstModalEdit
                      showModal={setShowEdit}
                      zstPost={zstPost}
                    ></ZstModalEdit>
                  </div>
                  <DialogFooter className="sm:justify-start"></DialogFooter>
                </DialogContent>
              ) : null}
            </Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="mx-1"
                    onClick={() => copyClipBoard(zstPost.title)}
                  >
                    <ClipboardCopyIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>タイトルのコピー</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {/* todo:add ShortLink Url */}
          <AccordionContent>
            <div
              className="text-black text-lg whitespace-pre-wrap break-words relative"
              onClick={() => setShowCopyButton((prev) => !prev)}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: getIncludelLinkHtmlFromText(zstPost.content, 30),
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
                        onClick={() => copyClipBoard(zstPost.content)}
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
