"use client";
import React, { useEffect, useState } from "react";
import ZstViewGrid from "./zstViewGrid";
import { TypeZstDay, TypeZstPost } from "@/app/types/zstTypes";
import Link from "next/link";
import { addDays } from "date-fns";
import { GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  BoxIcon,
  LayoutIcon,
  GridIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { getUtilUser } from "@/app/actions/user/utilUser";
import { User } from "@/app/types/user";
import UserContext from "../user/UserContext";

interface propTypes {
  rows: number;
  cols: number;
  basedate: Date;
  dates: Date[];
  zstPosts: TypeZstPost[];
}
const ZstPageViewGrid = (props: propTypes) => {
  const { rows, cols, basedate, dates, zstPosts } = props;
  // console.log("ZstPageViewGrid:start");

  const basedateafter = GetyyyyMMddJpFromDate(addDays(basedate, rows * cols));
  const basedatebefore = GetyyyyMMddJpFromDate(addDays(basedate, -rows * cols));
  const basedatestr = GetyyyyMMddJpFromDate(basedate);
  const basedatetoday = GetyyyyMMddJpFromDate(new Date());

  const [nowUser, setNowUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUtilUser();
      // console.log("ZstPageViewGrid", user);
      setNowUser(user);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={nowUser}>
      <div className="px-3 py-3">
        <div className="flex flex-row py-3 items-center ">
          <div className="flex  flex-wrap  items-center w-full">
            <div className="text-gray-900 text-lg px-2 py-2 font-bold underline">
              {dates[0].toLocaleDateString()}
            </div>
            <div className=" flex items-center">
              <Button className="underline" variant="outline">
                <Link
                  href={`/zstPosts/view/grid/?basedate=${basedatetoday}&cols=${cols}&rows=${rows}`}
                >
                  today
                </Link>
              </Button>
              <Button className="" variant="outline" size="icon">
                <Link
                  href={`/zstPosts/view/grid/?basedate=${basedatebefore}&cols=${cols}&rows=${rows}`}
                >
                  <DoubleArrowLeftIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button className="" variant="outline" size="icon">
                <Link
                  href={`/zstPosts/view/grid/?basedate=${basedateafter}&cols=${cols}&rows=${rows}`}
                >
                  <DoubleArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div>
              <Button className="underline" variant="outline">
                <Link
                  href={`/zstPosts/view/grid/?basedate=${basedatestr}&cols=${1}&rows=${3}`}
                >
                  1x3
                </Link>
              </Button>
              <Button className="underline" variant="outline">
                <Link
                  href={`/zstPosts/view/grid/?basedate=${basedatestr}&cols=${3}&rows=${3}`}
                >
                  3x3
                </Link>
              </Button>
              <Button className="underline" variant="outline">
                <Link
                  href={`/zstPosts/view/grid/?basedate=${basedatestr}&cols=${4}&rows=${4}`}
                >
                  4x4
                </Link>
              </Button>
              <Button className="underline" variant="outline">
                <Link
                  href={`/zstPosts/view/grid/?basedate=${basedatestr}&cols=${5}&rows=${5}`}
                >
                  5x5
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            <div className="flex flex-row">
              <div>
                <Button className="" variant="outline" size="icon">
                  <Link
                    href={`/zstPosts/view/grid/?basedate=${basedateafter}&cols=${cols}&rows=${rows}`}
                  >
                    <GridIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div>
                <Button className="" variant="outline" size="icon">
                  <Link href={`/zstPosts/view/day/?date=${basedateafter}`}>
                    <CalendarIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex"></div>
        <div className="flex"></div>
        <ZstViewGrid
          rows={rows}
          cols={cols}
          basedate={basedate}
          className={""}
          dates={dates}
          zstPosts={zstPosts}
        ></ZstViewGrid>{" "}
        <div>
          user.userid:{nowUser?.id}:{nowUser?.userid}:{nowUser?.username}
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default ZstPageViewGrid;
