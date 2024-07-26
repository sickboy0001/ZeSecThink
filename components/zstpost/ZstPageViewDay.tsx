"use client";
import React, { useEffect, useState } from "react";
import { TypeZstPost } from "@/app/types/zstTypes";
import Link from "next/link";
import { addDays } from "date-fns";
import { GetDateFromyyyyMMdd, GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
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

interface propTypes {
  date: Date;
  zstPosts: TypeZstPost[];
  className: string;
}
const zstPageViewDay = (props: propTypes) => {
  const { className, date, zstPosts } = props;
  // console.log("ZstPageViewGrid:start");
  const [nowUser, setNowUser] = useState<User | null>(null);
  let basedate = date;
  const nowstring = GetyyyyMMddJpFromDate(new Date());
  if (!basedate) {
    basedate = GetDateFromyyyyMMdd(nowstring);
  }
  const datebefore = GetyyyyMMddJpFromDate(addDays(basedate, -1));
  const dateafter = GetyyyyMMddJpFromDate(addDays(basedate, 1));

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUtilUser();
      if (user) {
        setNowUser(user);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={nowUser}>
      <div className="px-3 py-3">
        <div className="flex py-3  w-full">
          <div className="flex  flex-wrap w-full items-center ">
            <div className="text-gray-900 text-lg px-2 py-2 font-bold underline">
              {date.toLocaleDateString()}
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
                <Link href={`/zstPosts/view/day/?date=${nowstring}`}>
                  today
                </Link>
              </Button>
              <Button className="" variant="outline" size="icon">
                <Link href={`/zstPosts/view/day/?date=${datebefore}`}>
                  <DoubleArrowLeftIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button className="" variant="outline" size="icon">
                <Link href={`/zstPosts/view/day/?date=${dateafter}`}>
                  <DoubleArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-row-reverse ">
            <div>
              <Button className="" variant="outline" size="icon">
                <Link href={`/zstPosts/view/grid/?date=${nowstring}`}>
                  <GridIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div>
              <Button className="" variant="outline" size="icon">
                <Link href={`/zstPosts/view/day/?date=${nowstring}`}>
                  <CalendarIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <ZstDDayTitles
          className={className}
          zstPosts={zstPosts}
          date={date}
        ></ZstDDayTitles>
      </div>
    </UserContext.Provider>
  );
};

export default zstPageViewDay;
