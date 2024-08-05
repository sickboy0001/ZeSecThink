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
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ZstTitle from "./zstTitles";
import { ja } from "date-fns/locale/ja";
import { format as formatTz } from "date-fns-tz";

import { TypeZstPost } from "@/app/types/zstTypes";
import Link from "next/link";
import { GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import ZstAddDialog from "./zstAddDialog";

interface propTypes {
  className: string;
  date: Date;
  zstPosts: TypeZstPost[];
}

const ZstDayTitles = ({ className, zstPosts, date, ...props }: propTypes) => {
  const [showEdit, setShowEdit] = useState(false);

  const isSunday = date.getDay() === 0;
  const isSatday = date.getDay() === 6;

  const datestr = GetyyyyMMddJpFromDate(date);

  // console.log("zstDayTItle:start:");

  return (
    <>
      <div className="">
        <Card className={cn(className)} {...props}>
          <CardHeader className="py-1 px-2 md:px-4 ">
            <CardTitle>
              <div className="flex  flex-wrap items-center justify-between">
                <div className="flex">
                  <div
                    className={` ${isSunday ? "text-red-500" : ""} ${
                      isSatday ? "text-blue-500" : ""
                    }`}
                  >
                    {formatTz(date, "yyyy/M/d", {
                      timeZone: "Asia/Tokyo",
                      locale: ja,
                    })}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="px-2 text-gray-500 font-semibold ">
                    [
                    {String(
                      zstPosts.filter(
                        (f) =>
                          String(new Date(f.current_at).toDateString()) ===
                            String(date.toDateString()) && !f.delete_flg
                      ).length
                    )}
                    /10]
                  </div>
                  <Button className="" variant="outline" size="icon">
                    <Link href={`/zstPosts/view/day/?date=${datestr}`}>
                      <CalendarIcon className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid py-1 md:px-4 px-2">
            <ZstTitle date={date} zstPosts={zstPosts}></ZstTitle>
          </CardContent>
          <CardFooter>
            <ZstAddDialog
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              date={date}
            ></ZstAddDialog>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ZstDayTitles;
