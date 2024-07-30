"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import ZstTitle from "./zstTitles";
import { ja } from "date-fns/locale/ja";
import { format as formatTz } from "date-fns-tz";

import { TypeZstPost } from "@/app/types/zstTypes";
import ZstModalNew from "./zstModalNew";
import Link from "next/link";
import {
  GetDateFromyyyyMMdd,
  GetDateTimeFormat,
  GetyyyyMMddJpFromDate,
} from "@/lib/utilsDate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

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
            <DialogTitle>Add ({GetDateTimeFormat(date, "M/dd")})</DialogTitle>
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
