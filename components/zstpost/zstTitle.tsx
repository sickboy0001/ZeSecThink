"use client";

import { TypeZstPost } from "@/app/types/zstTypes";
import { Pencil1Icon, Cross1Icon, CopyIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ZstModalEdit from "./zstModalEdit";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

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
    <div className="py-1">
      <Accordion
        type="single"
        collapsible
        defaultValue={`item-key-${String(itemkey)}}${dispword}`}
      >
        <AccordionItem value={`item-key-${String(itemkey)}}`}>
          <div className="flex">
            <AccordionTrigger className="py-2">
              <div className="font-medium leading-none underline text-left">
                {zstPost.title}
              </div>
            </AccordionTrigger>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Pencil1Icon className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit</DialogTitle>
                  <DialogDescription>
                    <div className="p-4 md:p-5">{formElement}</div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start"></DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <AccordionContent>
            <Label className="text-black whitespace-pre-wrap break-words">
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
