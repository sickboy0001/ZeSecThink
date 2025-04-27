"use client";
import React from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { GetDateTimeFormat } from "@/lib/utilsDate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ModelZstPostNew from "../Modal/ModelZstPostNew";
import { TypeZstPostWithTags } from "@/app/types/zstTypes";

interface propTypes {
  date: Date;
  showEdit: boolean;
  setShowEdit: any;
  putZstPosts: (posts: TypeZstPostWithTags, actionType: string) => void;
}

const DialogAdd = (props: propTypes) => {
  const { date, showEdit, setShowEdit, putZstPosts } = props;

  // console.log("zstDayTItle:start:");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setShowEdit(true)}
        >
          <Pencil2Icon className="h-5 w-5" /> add
        </Button>
      </DialogTrigger>
      {showEdit ? (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-left">
              Add
              <label className="text-gray-500 px-2">
                [{GetDateTimeFormat(date, "M月d日")}]
              </label>
            </DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="p-4 md:p-5">
              <ModelZstPostNew
                showModal={setShowEdit}
                date={date}
                putZstPosts={putZstPosts}
              ></ModelZstPostNew>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default DialogAdd;
