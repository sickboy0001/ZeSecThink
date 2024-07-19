"use client";

import { TypeZstContent, TypeZstPost } from "@/app/types/zstTypes";
import { Pencil1Icon, Cross1Icon } from "@radix-ui/react-icons";
import React, { useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import ZstModalEdit from "./zstModalEdit";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GetFormatTz } from "@/lib/utilsDate";
import { updateFlgZstPost } from "@/app/actions/zstPosts/posts";

interface propTypes {
  zstPost: TypeZstPost;
  isDispDetail?: boolean;
}

const ZstTitle = (props: propTypes) => {
  const { zstPost, isDispDetail } = props;
  const [nowZstPost, setNowZstPost] = useState<TypeZstPost>(zstPost);
  const itemkey = 0;
  const [showEdit, setShowEdit] = useState(false);
  const [isCheckedDelete, setIsCheckedDelete] = useState(nowZstPost.delete_flg);
  const [isCheckedPublic, setIsCheckedPublic] = useState(nowZstPost.public_flg);
  const switchPublicRef = useRef<HTMLButtonElement>(null);
  const switchDeleteRef = useRef<HTMLButtonElement>(null);

  async function update_deletepublic_flg(
    fullid: string | undefined,
    checked: boolean
  ) {
    const columnname = fullid?.split("_")[0] + "_" + fullid?.split("_")[1];
    const id = parseInt(fullid?.split("_")[2] ?? "0");
    // console.log("--------------handleSubmit");
    const data = await updateFlgZstPost(id, columnname, checked);
    setNowZstPost(data);
    // console.log("todo:Update", columnname, id, checked);
  }

  const handleSwitchPublicChange = (checked: boolean) => {
    const fullid = switchPublicRef.current?.id;
    update_deletepublic_flg(fullid, checked);
    setIsCheckedPublic(checked);
  };

  const handleSwitchDeleteChange = (checked: boolean) => {
    const fullid = switchDeleteRef.current?.id;
    update_deletepublic_flg(fullid, checked);
    setIsCheckedDelete(checked);
  };

  const formElement = (
    <ZstModalEdit showModal={setShowEdit} zstPost={nowZstPost}></ZstModalEdit>
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
                  {nowZstPost.title}
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
                {nowZstPost.content}
              </Label>
              {isDispDetail && (
                <div>
                  <div className="text-gray-600/70">
                    [{String(nowZstPost.second)}sec] [writing start-end{" "}
                    {GetFormatTz(nowZstPost.write_start_at)}-
                    {GetFormatTz(nowZstPost.write_end_at)}] [create{" "}
                    {GetFormatTz(nowZstPost.create_at)}/update
                    {GetFormatTz(nowZstPost.update_at)}]
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex ml-2 items-center space-x-2">
                      <Switch
                        id={`delete_flg_${nowZstPost.id}`}
                        checked={isCheckedDelete}
                        ref={switchDeleteRef}
                        onCheckedChange={(value) => {
                          handleSwitchDeleteChange(value);
                        }}
                      />
                      <Label htmlFor={`delete_flg_${nowZstPost.id}`}>
                        delete
                      </Label>
                    </div>
                    <div className="flex ml-2 items-center space-x-2">
                      <Switch
                        id={`public_flg_${nowZstPost.id}`}
                        checked={isCheckedPublic}
                        ref={switchPublicRef}
                        onCheckedChange={(value) => {
                          handleSwitchPublicChange(value);
                        }}
                      />
                      <Label htmlFor={`public_flg_${nowZstPost.id}`}>
                        public
                      </Label>
                    </div>
                  </div>
                </div>
              )}
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
