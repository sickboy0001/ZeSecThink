"use client";

import React from "react";
import { TypeZstPost } from "@/app/types/zstTypes";
import ZstDayTitles from "./zstDayTitles";

interface propTypes {
  rows: number;
  cols: number;
  basedate: Date;
  className: string;
  dates: Date[];
  zstPosts: TypeZstPost[];
}

const ZstViewGrid = ({ className, ...props }: propTypes) => {
  const { rows, cols, dates, zstPosts } = props;
  // grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5
  const grdicolsnumber = `grid-cols-${String(cols)}`;
  const divclassNameValue = `grid grid-cols-${String(cols)} gap-4`;
  return (
    <>
      <div className={divclassNameValue}>
        {dates.map((date, key) => (
          <div key={key}>
            <ZstDayTitles
              className={className}
              date={date}
              zstPosts={zstPosts}
            ></ZstDayTitles>
          </div>
        ))}
      </div>
    </>
  );
};

export default ZstViewGrid;
