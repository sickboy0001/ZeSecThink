"use client";
import React from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ZstModalNew from "./zstModalNew";
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

interface propTypes {
  date: Date;
  showEdit: boolean;
  setShowEdit: any;
}

const ZstAddDialog = ({ date, showEdit, setShowEdit }: propTypes) => {
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
            <DialogTitle>Add ({GetDateTimeFormat(date, "M/d")})</DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="p-4 md:p-5">
              <ZstModalNew showModal={setShowEdit} date={date}></ZstModalNew>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default ZstAddDialog;
