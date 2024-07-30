"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import ZstTitles from "./zstTitles";

import { TypeZstPost } from "@/app/types/zstTypes";
import ZstModalNew from "./zstModalNew";
import { GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
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
  className: string;
  date: Date;
  zstPosts: TypeZstPost[];
}

const ZstDDayTitles = ({ className, zstPosts, date, ...props }: propTypes) => {
  const [showEdit, setShowEdit] = useState(false);

  const isSunday = date.getDay() === 0;
  const isSatday = date.getDay() === 6;

  const datestr = GetyyyyMMddJpFromDate(date);

  // console.log("zstDayTItle:start:");
  const formElement = (
    <ZstModalNew showModal={setShowEdit} date={date}></ZstModalNew>
  );

  // useEffect(() => {
  //   console.log("ZstDDayTitles: zstPosts changed:", zstPosts.slice(0, 2));
  // }, [zstPosts]);

  const dialogFormElement = (
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
            <DialogTitle>Add</DialogTitle>
            <DialogDescription>
              <div className="p-4 md:p-5">{formElement}</div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start"></DialogFooter>
        </DialogContent>
      ) : null}
    </Dialog>
  );

  return (
    <>
      <Card className={cn(className)} {...props}>
        <CardContent className="grid gap-1 px-2 md:px-4 ">
          <ZstTitles
            date={date}
            zstPosts={zstPosts}
            isDispDetail={true}
          ></ZstTitles>
        </CardContent>
        <CardFooter>{dialogFormElement}</CardFooter>
      </Card>
    </>
  );
};

export default ZstDDayTitles;
