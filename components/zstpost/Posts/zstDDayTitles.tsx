"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { TypeZstPostWithTags } from "@/app/types/zstTypes";
import DialogAdd from "./DialogAdd";
import ZstTitles from "./zstTitles";
import { TypeTagMas } from "@/app/types/tagTypes";

interface propTypes {
  className: string;
  date: Date;
  zstPosts: TypeZstPostWithTags[];
  putZstPosts: (posts: TypeZstPostWithTags, actionType: string) => void;
  favoriteTagMass: TypeTagMas[];
  normalTagMass: TypeTagMas[];
}
//
const ZstDDayTitles = ({
  className,
  zstPosts,
  date,
  putZstPosts,
  favoriteTagMass,
  normalTagMass,
  ...props
}: propTypes) => {
  const [showEdit, setShowEdit] = useState(false);
  // console.log("ZstDDayTitles", zstPosts.length, zstPosts);

  return (
    <>
      <Card className={cn(className)} {...props}>
        <CardContent className="grid gap-1 px-2 md:px-4 ">
          <ZstTitles
            date={date}
            zstPosts={zstPosts}
            isDispDetail={true}
            putZstPosts={putZstPosts}
            favoriteTagMass={favoriteTagMass}
            normalTagMass={normalTagMass}
          ></ZstTitles>
        </CardContent>

        <CardFooter>
          <DialogAdd
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            date={date}
            putZstPosts={putZstPosts}
          ></DialogAdd>
        </CardFooter>
      </Card>
    </>
  );
};

export default ZstDDayTitles;
