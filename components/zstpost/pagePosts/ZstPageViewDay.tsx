"use client";
import React, { useContext, useEffect, useState } from "react";
import { TypeZstPost } from "@/app/types/zstTypes";
import { addDays, format } from "date-fns";
import {
  GetDateFromyyyyMMdd,
  GetDateFromyyyyMMdd2,
  GetDateTimeFormat,
  GetyyyyMMddJpFromDate,
} from "@/lib/utilsDate";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  CalendarIcon,
  GridIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import ZstDDayTitles from "./zstDDayTitles";
import UserContext from "@/components/user/UserContext";
import ZstAddDialog from "./zstAddDialog";
import { toZonedTime } from "date-fns-tz";
import { getPosts } from "@/app/actions/zstPosts/posts";

interface propTypes {
  datestring: string;
  className: string;
}
const zstPageViewDay = (props: propTypes) => {
  const { className, datestring } = props;
  const [zstPosts, setZstPosts] = useState<TypeZstPost[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const user = useContext(UserContext);

  // console.log("const zstPageViewDay:date", date);
  // const zstPosts = await getPosts(user?.userid, date, date);

  // console.log("ZstPageViewGrid:start");
  // const now = toZonedTime(new Date(), "Asia/Tokyo"); // UTCを日本時間に変換
  // const nowstring = format(now, "yyyyMMdd");
  // console.log("const zstPageViewDay:nowstring", nowstring);
  // if (!basedate) {
  //   basedate = GetDateFromyyyyMMdd2(nowstring);
  // }
  // console.log("const zstPageViewDay:basedate", basedate);

  useEffect(() => {
    // console.log("zstPosts has changed:", zstPosts.slice(0, 2));
    const fetch = async () => {
      const thisdt = GetDateFromyyyyMMdd(datestring);
      // toZonedTime(thisdt, "Asia/Tokyo")
      // thisdt.setHours(0, 0, 0);
      // console.log("zstPageViewDay.fetch.thisdt", thisdt);
      const thisdttz = toZonedTime(thisdt, "Asia/Tokyo");
      console.log("zstPageViewDay.fetch.thisdttz", thisdttz);
      const ThisZstPosts = await getPosts(user?.userid, thisdttz, thisdttz);
      setZstPosts(ThisZstPosts);
    };
    fetch();
  }, [datestring]);

  const basedate = GetDateFromyyyyMMdd(datestring);
  const datebefore = GetyyyyMMddJpFromDate(addDays(basedate, -1));
  const dateafter = GetyyyyMMddJpFromDate(addDays(basedate, 1));

  const isSunday = basedate.getDay() === 0;
  const isSatday = basedate.getDay() === 6;

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
              {GetDateTimeFormat(basedate, "yyyy/M/d(E)")}
            </div>
          </div>
          <div className="px-3 text-gray-500 font-semibold ">
            [
            {String(
              zstPosts.filter(
                (f) =>
                  String(new Date(f.current_at).toDateString()) ===
                    String(basedate.toDateString()) && !f.delete_flg
              ).length
            )}
            /10]
          </div>
          <div className="flex ">
            <Button className="underline" variant="outline">
              <a href={`/zstPosts/view/day/`}>today</a>
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
                date={basedate}
              ></ZstAddDialog>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse ">
          <div>
            <Button className="" variant="outline" size="icon">
              <a href={`/zstPosts/view/grid/`}>
                <GridIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div>
            <Button className="" variant="outline" size="icon">
              <a href={`/zstPosts/view/day/`}>
                <CalendarIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      <ZstDDayTitles
        className={className}
        zstPosts={zstPosts}
        date={basedate}
      ></ZstDDayTitles>
    </div>
  );
};

export default zstPageViewDay;
