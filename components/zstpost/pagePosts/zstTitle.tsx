"use client";

import { TypeZstPost } from "@/app/types/zstTypes";
import { Pencil1Icon, LockClosedIcon } from "@radix-ui/react-icons";
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

interface propTypes {
  zstPost: TypeZstPost;
  isDispDetail?: boolean;
  children?: React.ReactNode;
}

const ZstTitle = (props: propTypes) => {
  const { zstPost, isDispDetail, children } = props;
  // const [nowZstPost, setNowZstPost] = useState<TypeZstPost>(zstPost);
  const itemkey = 0;
  const [showEdit, setShowEdit] = useState(false);
  const formElement = (
    <ZstModalEdit showModal={setShowEdit} zstPost={zstPost}></ZstModalEdit>
  );
  const dispword = isDispDetail ? "" : "1";

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
                  <div className="">{formElement}</div>
                  <DialogFooter className="sm:justify-start"></DialogFooter>
                </DialogContent>
              ) : null}
            </Dialog>
          </div>
          <AccordionContent>
            <Label className="text-black text-lg whitespace-pre-wrap break-words">
              {zstPost.content}
            </Label>
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ZstTitle;
