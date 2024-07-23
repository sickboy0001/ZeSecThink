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
import ZstTitles from "./zstTitles";
import { ja } from "date-fns/locale/ja";
import { format as formatTz } from "date-fns-tz";

import { TypeZstPost } from "@/app/types/zstTypes";
import ZstModalNew from "./zstModalNew";
import Link from "next/link";
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

  return (
    <>
      <Card className={cn(className)} {...props}>
        <CardContent className="grid gap-1">
          <ZstTitles
            date={date}
            zstPosts={zstPosts}
            isDispDetail={true}
          ></ZstTitles>
        </CardContent>
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full" variant="outline">
                <Pencil2Icon className="h-5 w-5" /> add
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
        </CardFooter>
      </Card>
    </>
  );
};

export default ZstDDayTitles;
