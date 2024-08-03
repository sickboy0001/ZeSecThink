"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ZstTitles from "./zstTitles";

import { TypeZstPost } from "@/app/types/zstTypes";

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
