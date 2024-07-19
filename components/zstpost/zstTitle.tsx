"use client";

import { TypeZstPost } from "@/app/types/zstTypes";
import { Pencil1Icon, Cross1Icon } from "@radix-ui/react-icons";
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
      <div className="">
        <Accordion
          type="single"
          collapsible
          defaultValue={`item-key-${String(itemkey)}}${dispword}`}
        >
          <AccordionItem value={`item-key-${String(itemkey)}}`}>
            <div className="flex">
              <AccordionTrigger className="py-2">
                <div className="font-medium leading-none underline">
                  {zstPost.title}
                </div>
              </AccordionTrigger>
              <Button
                type="button"
                onClick={() => setShowEdit(true)}
                variant="outline"
                size="icon"
              >
                <Pencil1Icon className="h-5 w-5" />
              </Button>
            </div>
            <AccordionContent>
              <Label className="text-black whitespace-pre-wrap">
                {zstPost.content}
              </Label>
              {children}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      {showEdit ? (
        <>
          <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full bg-black-rgba">
            <div className="m-auto relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-xl font-semibold text-gray-900">Edit</h3>
                  <Button
                    type="button"
                    onClick={() => setShowEdit(false)}
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-hide="authentication-modal"
                    size="icon"
                  >
                    <Cross1Icon className="h-5 w-5" />
                    <span className="sr-only">閉じる</span>
                  </Button>
                </div>
                <div className="p-4 md:p-5">{formElement}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ZstTitle;
