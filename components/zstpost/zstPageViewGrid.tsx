import React from "react";
import ZstViewGrid from "./zstViewGrid";
import { TypeZstDay, TypeZstPost } from "@/app/types/zstTypes";
import Link from "next/link";
import { addDays } from "date-fns";
import { GetyyyyMMddJpFromDate } from "@/lib/utilsDate";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";

interface propTypes {
  rows: number;
  cols: number;
  basedate: Date;
  dates: Date[];
  zstPosts: TypeZstPost[];
}
const ZstPageViewGrid = (props: propTypes) => {
  const { rows, cols, basedate, dates, zstPosts } = props;

  const basedateafter = GetyyyyMMddJpFromDate(addDays(basedate, rows * cols));
  const basedatebefore = GetyyyyMMddJpFromDate(addDays(basedate, -rows * cols));
  const basedatestr = GetyyyyMMddJpFromDate(basedate);
  const basedatetoday = GetyyyyMMddJpFromDate(new Date());

  return (
    <div className="px-3 py-3">
      <div className="flex">
        <div className="text-gray-900 text-lg px-2 py-2 font-bold underline">
          {dates[0].toLocaleDateString()}
        </div>
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

      <ZstViewGrid
        rows={rows}
        cols={cols}
        basedate={basedate}
        className={""}
        dates={dates}
        zstPosts={zstPosts}
      ></ZstViewGrid>
    </div>
  );
};

export default ZstPageViewGrid;
