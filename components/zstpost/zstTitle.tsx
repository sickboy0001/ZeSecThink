"use client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { TypeZstContent, TypeZstPost } from "@/app/types/zstTypes";
import { Pencil1Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ZstModalEdit from "./zstModalEdit";
import { Button } from "../ui/button";

interface propTypes {
  zstPost: TypeZstPost;
  key: Number;
}

const ZstTitle = (props: propTypes) => {
  const { zstPost, key } = props;
  const [showEdit, setShowEdit] = useState(false);

  const formElement = (
    <ZstModalEdit
      showModal={setShowEdit}
      zstPost={zstPost}
      key={Number(key)}
    ></ZstModalEdit>
  );

  // console.log(zstContent);
  return (
    <div key={String(key)} className="py-1">
      <div className="">
        <Accordion
          type="single"
          collapsible
          defaultValue={`item-key-${String(key)}}`}
        >
          <AccordionItem value={`item-key-${String(key)}}1`}>
            <div className="flex">
              <AccordionTrigger className="py-2">
                <div className="font-medium leading-none">{zstPost.title}</div>
              </AccordionTrigger>
              <Button
                type="button"
                onClick={() => setShowEdit(true)}
                variant="outline"
                size="icon"
              >
                <Pencil2Icon className="h-4 w-4" />
              </Button>
            </div>
            <AccordionContent>
              {/* {zstContent.content.map((item, mapkey) => (
                <p key={mapkey} className="text-sm ">
                  {item}
                </p>
              ))} */}
              {zstPost.content}
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
                  <h3 className="text-xl font-semibold text-gray-900">test</h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-hide="authentication-modal"
                    onClick={() => setShowEdit(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">モーダルを閉じる</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">{formElement}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* <div>
        <div className="flex pb-1 ">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <p className="font-medium leading-none">{zstContent.title}</p>
          <div>
            <Pencil1Icon className="mr-2 h-4 w-4" />
          </div>
        </div>
        <div>
          {zstContent.content.map((item, mapkey) => (
            <p key={mapkey} className="text-sm ">
              {item}
            </p>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ZstTitle;
