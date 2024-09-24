"use client";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Cross1Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ModalQuotationList from "./ModalQuotationList";

const PageQuotation = () => {
  const [text, setText] = useState<string>("");
  const [isShowQuotationList, setIsShowQuotationList] =
    useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const [open, setOpen] = useState(false);

  const defuserid = 1;

  return (
    <div className="">
      <div className="flex">
        <Input
          type="title"
          name="title"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="タイトル"
          value={text}
          onChange={handleChange}
        />
        <div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                type="button"
                // onClick={() => setIsShowQuotationList(true)}
                variant="outline"
                size="icon"
              >
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Quoattion</DialogTitle>
              </DialogHeader>
              <ModalQuotationList
                userid={0}
                setText={setText}
                setOpen={setOpen}
              ></ModalQuotationList>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default PageQuotation;
