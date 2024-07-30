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
import { GetDateTimeFormat, GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ZstAddDialog from "./zstAddDialog";

interface propTypes {
  className: string;
  date: Date;
  zstPosts: TypeZstPost[];
}

const ZstDDayTitles = ({ className, zstPosts, date, ...props }: propTypes) => {
  const [showEdit, setShowEdit] = useState(false);

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

        <CardFooter>
          <ZstAddDialog
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            date={date}
          ></ZstAddDialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default ZstDDayTitles;
