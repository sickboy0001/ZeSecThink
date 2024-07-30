"use client";
import React, { useContext, useEffect, useState } from "react";
import { TypeZstPost } from "@/app/types/zstTypes";
import Link from "next/link";
import { addDays } from "date-fns";
import {
  GetDateFromyyyyMMdd,
  GetDateTimeFormat,
  GetyyyyMMddJpFromDate,
} from "@/lib/utilsDate";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  BoxIcon,
  LayoutIcon,
  CalendarIcon,
  GridIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import ZstDDayTitles from "./zstDDayTitles";
import UserContext from "../user/UserContext";
import { getUtilUser } from "@/app/actions/user/utilUser";
import { User } from "@/app/types/user";
import ZstAddDialog from "./zstAddDialog";

interface propTypes {
  date: Date;
  zstPosts: TypeZstPost[];
  className: string;
}
const zstPageViewDay = (props: propTypes) => {
  const { className, date, zstPosts } = props;
  const [thisZstPosts, setThisZstPosts] = useState<TypeZstPost[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const user = useContext(UserContext);
  // console.log("ZstPageViewGrid:start");
  let basedate = date;
  const nowstring = GetyyyyMMddJpFromDate(new Date());
  if (!basedate) {
    basedate = GetDateFromyyyyMMdd(nowstring);
  }
  const datebefore = GetyyyyMMddJpFromDate(addDays(basedate, -1));
  const dateafter = GetyyyyMMddJpFromDate(addDays(basedate, 1));

  useEffect(() => {
    // console.log("zstPosts has changed:", zstPosts.slice(0, 2));
    setThisZstPosts(zstPosts);
  }, [zstPosts]);

  const isSunday = date.getDay() === 0;
  const isSatday = date.getDay() === 6;

  return (
    <div className="px-3 py-3">
      <div className="flex py-3  w-full">
        <div className="flex  flex-wrap w-full items-center ">
          <div className="text-gray-900 text-lg px-2 py-2 font-extrabold">
            <div
              className={` ${isSunday ? "text-red-500" : ""} ${
                isSatday ? "text-blue-500" : ""
              }`}
            >
              {GetDateTimeFormat(date, "yyyy/MM/dd(E)")}
            </div>
          </div>
          <div className="px-3 text-gray-500 font-semibold ">
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
          <div className="flex ">
            <Button className="underline" variant="outline">
              <a href={`/zstPosts/view/day/?date=${nowstring}`}>today</a>
            </Button>
            <Button className="" variant="outline" size="icon">
              <a href={`/zstPosts/view/day/?date=${datebefore}`}>
                <DoubleArrowLeftIcon className="h-4 w-4" />
              </a>
            </Button>
            <Button className="" variant="outline" size="icon">
              <a href={`/zstPosts/view/day/?date=${dateafter}`}>
                <DoubleArrowRightIcon className="h-4 w-4" />
              </a>
            </Button>
            <div>
              <ZstAddDialog
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                date={date}
              ></ZstAddDialog>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse ">
          <div>
            <Button className="" variant="outline" size="icon">
              <a href={`/zstPosts/view/grid/?date=${nowstring}`}>
                <GridIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div>
            <Button className="" variant="outline" size="icon">
              <a href={`/zstPosts/view/day/?date=${nowstring}`}>
                <CalendarIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <ZstDDayTitles
        className={className}
        zstPosts={thisZstPosts}
        date={date}
      ></ZstDDayTitles>
    </div>
  );
};

export default zstPageViewDay;
